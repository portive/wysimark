import beeper from "beeper"
import { rollup } from "rollup"
import * as util from "@thesunny/script-utils"
import { onwarn } from "../onwarn"
import { plugins } from "./analyze-plugins"

const INPUT_PATH = "editor/index.tsx"
const ANALYZE_DIR = "./.dist/analyze"

/**
 * Packages not to bundle up inside deliverable.
 *
 * This means these need to be added as dependencies of the package built.
 */
// const EXTERNAL = [
//   "axios",
//   "react",
//   "react-dom",
//   "@emotion/cache",
//   "@emotion/core",
//   "@emotion/styled",
// ]

// const EXTERNAL = getExternal()

async function build() {
  // const start = new Date()
  try {
    /**
     * Clear directories
     */
    util.title("Analyze Wysimark for React")
    util.emptyDir(ANALYZE_DIR)

    /**
     * Build Bundle for Analysis
     */
    util.heading("Build bundle for analysis")
    await rollup({
      input: INPUT_PATH,
      plugins: plugins({ analysisPath: `${ANALYZE_DIR}/analysis.json` }),
      onwarn,
      // external: EXTERNAL,
    })

    // /**
    //  * Write CJS
    //  */
    // util.heading("Write CommonJS files")
    // await bundle.write({
    //   file: `${BUILD_DIR}/index.js`,
    //   format: "cjs",
    //   sourcemap: true,
    // })

    /**
     * Write ESM
     */
    // util.heading("Write ESM files")
    // await bundle.write({
    //   file: `${ANALYZE_DIR}/index.esm.js`,
    //   format: "esm",
    // })

    // /**
    //  * Bundle Types
    //  */
    // util.heading("Compile TypeScript types into a single file")
    // util.ensureFileExists(BUILD_TYPES_SRC_PATH)

    // /**
    //  * Build TypeScript Types
    //  */
    // const typesBundle = await rollup({
    //   input: BUILD_TYPES_SRC_PATH,
    //   plugins: [dts()],
    // })

    // /**
    //  * Write TypeScript Types
    //  */
    // util.heading("Write Compiled TypeScript types")
    // await typesBundle.write({ file: BUILD_TYPES_DEST_PATH, format: "es" })

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

    // /**
    //  * Modify package.json to add dependencies
    //  */
    // addDependenciesToPackage(PACKAGE_PATH)
  } catch (e) {
    await beeper("**-**")
    throw e
  }
  await beeper("**")
}

build()

export {}
