import beeper from "beeper"
import copy from "cpy"
import * as fs from "fs-extra"
import { rollup } from "rollup"
import dts from "rollup-plugin-dts"
import * as utils from "@thesunny/script-utils"
import { getExternal } from "../dependencies"
import { onwarn } from "../onwarn"
import { plugins } from "../plugins"

/**
 * Code Splitting in Rollup
 *
 * - https://www.infoq.com/news/2019/03/rollup-code-splitting/#:~:text=Rollup%201.0%20enables%20developers%20to,import%20targets%20with%20optimized%20bundles.&text=Rollup%201.0%20will%20reduce%20the,several%20of%20the%20other%20chunks.
 */

const REACT_PATH = "editor/index.tsx"
const STANDALONE_PATH = "editor/standalone.tsx"
const CACHE_DIR = ".build/chunks-cache"
const BUILD_DIR = ".build/chunks"
const REACT_TYPES_PATH = `${BUILD_DIR}/core/esm/editor/index.d.ts`
const STANDALONE_TYPES_PATH = `${BUILD_DIR}/core/esm/editor/standalone.d.ts`
const VUE_TEMPLATE_SRC_PATH = `editor/vue-composition-component.vue`
const VUE_TEMPLATE_BUILD_PATH = `${BUILD_DIR}/core/cjs/vue-composition-component.vue`

const VUE_COMPOSITION_SRC_PATH = `editor/vue-composition-component.vue`
const VUE_OPTIONS_SRC_PATH = `editor/vue-options-component.vue`

const EXTERNAL = getExternal()

/**
 * Takes a `srcDir` and copies only files that are immediate children of the
 * dir (i.e. it is not recursive) to the `destDir`
 */
function copyDirShallow(srcDir: string, destDir: string) {
  const filenames = fs
    .readdirSync(srcDir, { withFileTypes: true })
    .map((e) => ({ name: e.name, isFile: e.isFile() }))
    .filter((d) => d.isFile)
    .map((d) => d.name)

  for (const filename of filenames) {
    utils.copyFile(`${srcDir}/${filename}`, `${destDir}/${filename}`)
  }
}

/**
 * `USE_CACHE` and related constants here are used to cache part of the
 * execution. In particular, if we are just working on the SECOND_PART, we
 * don't want to spend a minute waiting fo the first part to build when the
 * results will always be the same.
 *
 * USE_CACHE
 *
 * If `true`, we copy the files from `.build/chunks-cache` to `.build/chunks`.
 * In order to refresh the cache, set `USE_CACHE` to `false` and set
 * `RUN_SECOND_PART` to `false`. Run `yarn build:chunks`. When it's done,
 * delete the old `.build/chunks-cache` directory then rename the
 * `.build/chunks` directory to `.build/chunks-cache`.
 *
 * RUN_SECOND_PART
 *
 * If `true`, we execute the second part of the build process. Usually we only
 * set this to false when repopulating the cache for the first part.
 */
const USE_CACHE = false

const RUN_FIRST_PART = true

const RUN_SECOND_PART = true

const RUN_THIRD_PART = true

async function build() {
  /**
   * Build the core, that is, the non Vue parts of Wysimark. We need to
   * build Vue separately because Vue's JSX will conflict with React's JSX
   * if we build both parts at the same time.
   */
  utils.title("Build Wysimark Core: React and Standalone")
  utils.emptyDir(BUILD_DIR)

  if (USE_CACHE) {
    utils.heading("Copy Wysimark Core from Cache")
    utils.copyDir(CACHE_DIR, BUILD_DIR)
  }

  try {
    if (RUN_FIRST_PART) {
      /**
       * Build JavaScript, Source Maps and .d.ts files
       */
      utils.heading("Bundle JavaScript, Source Maps and .d.ts files")
      const bundle = await rollup({
        input: [REACT_PATH, STANDALONE_PATH],
        plugins: plugins({
          typescriptDeclarations: true,
        }),
        onwarn,
        external: EXTERNAL,
      })

      /**
       * Write CJS
       */
      utils.heading("Write CommonJS files")
      await bundle.write({
        dir: `${BUILD_DIR}/core/cjs`,
        format: "cjs",
        sourcemap: true,
      })

      /**
       * Write ESM
       */
      utils.heading("Write ESM files")
      await bundle.write({
        dir: `${BUILD_DIR}/core/esm`,
        format: "esm",
        sourcemap: true,
        chunkFileNames: "[name]-[hash].es.js",
        entryFileNames: "[name].es.js",
      })

      /**
       * Bundle Types
       */
      utils.heading("Bundle React and Standalone Types")
      utils.ensureFileExists(REACT_TYPES_PATH)
      utils.ensureFileExists(STANDALONE_TYPES_PATH)

      /**
       * Bundle TypeScript Types
       */
      const typesBundle = await rollup({
        input: [REACT_TYPES_PATH, STANDALONE_TYPES_PATH],
        plugins: [dts()],
      })

      /**
       * Write TypeScript Types
       */
      utils.heading("Write Compiled TypeScript types")
      await typesBundle.write({ dir: `${BUILD_DIR}/types`, format: "es" })
    }

    if (RUN_SECOND_PART) {
      utils.heading("Copy types into dist")
      utils.copyDir(`${BUILD_DIR}/types`, `${BUILD_DIR}/dist`)

      utils.heading("Copy core CJS files into dist")
      copyDirShallow(`${BUILD_DIR}/core/cjs`, `${BUILD_DIR}/dist`)

      utils.heading("Copy core ESM files into dist")
      copyDirShallow(`${BUILD_DIR}/core/esm`, `${BUILD_DIR}/dist`)

      /**
       * Copy `.vue` file into `BUILD_DIR` next to cjs file
       */
      utils.copyFile(VUE_TEMPLATE_SRC_PATH, VUE_TEMPLATE_BUILD_PATH)

      /**
       * Copy types into `core/cjs` subdirectory so that the Vue template can
       * find it.
       */
      utils.copyDir(`${BUILD_DIR}/types`, `${BUILD_DIR}/core/cjs`)

      /**
       * Build JavaScript, Source Maps and .d.ts files
       */
      utils.heading("Bundle Vue Template")
      const vueTemplateBundle = await rollup({
        input: [VUE_COMPOSITION_SRC_PATH, VUE_OPTIONS_SRC_PATH],
        plugins: plugins({ typescriptDeclarations: true }),
        onwarn,
        external(id) {
          const external =
            getExternal().includes(id) || id.includes("./standalone")
          console.log({ id, external })
          return external
        },
      })

      /**
       * Write CJS
       */
      utils.heading("Write CommonJS files for Vue Template")
      await vueTemplateBundle.write({
        dir: `${BUILD_DIR}/vue/cjs`,
        format: "cjs",
        sourcemap: true,
        exports: "default",
      })

      utils.heading("Write ESM files for Vue Template")
      await vueTemplateBundle.write({
        dir: `${BUILD_DIR}/vue/esm`,
        format: "esm",
        sourcemap: true,
        chunkFileNames: "[name]-[hash].es.js",
        entryFileNames: "[name].es.js",
      })

      utils.heading("Copy compiled vue files into dist")
      copyDirShallow(`${BUILD_DIR}/vue/cjs`, `${BUILD_DIR}/dist`)
      copyDirShallow(`${BUILD_DIR}/vue/esm`, `${BUILD_DIR}/dist`)

      utils.heading("Copy vue types into dist")
      utils.copyFile(
        `${BUILD_DIR}/vue/cjs/editor/vue-composition-component.vue.d.ts`,
        `${BUILD_DIR}/dist/vue-composition-component.d.ts`
      )
      utils.copyFile(
        `${BUILD_DIR}/vue/cjs/editor/vue-options-component.vue.d.ts`,
        `${BUILD_DIR}/dist/vue-options-component.d.ts`
      )
    }

    if (RUN_THIRD_PART) {
      utils.heading("Move React files to npm package")
      utils.emptyDir("../react/.dist")
      copy([".build/chunks/dist/index*.*"], "../react/.dist")

      utils.heading("Move Standalone files to npm package")
      utils.emptyDir("../standalone/.dist")
      copy(
        [".build/chunks/dist/index*.*", ".build/chunks/dist/standalone*.*"],
        "../standalone/.dist"
      )

      utils.heading("Move Vue files to npm package")
      utils.emptyDir("../vue/.dist")
      copy([".build/chunks/dist/*.*"], "../vue/.dist")
    }

    // /**
    //  * Copy dist files to NPM package directory
    //  */
    // util.heading("Copy files to NPM package directory")
    // for (const filename of FILENAMES) {
    //   util.copyFile(
    //     `${BUILD_DIR}/${filename}`,
    //     `${PACKAGE_DIST_DIR}/${filename}`
    //   )
    // }

    /**
     * Modify package.json to add dependencies
     */
    // addDependenciesToPackage(PACKAGE_PATH)
  } catch (e) {
    await beeper("**-**")
    throw e
  }
  await beeper("**")
}

build()

export {}
