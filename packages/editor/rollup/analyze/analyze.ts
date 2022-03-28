import beeper from "beeper"
import { rollup } from "rollup"
import typescript from "rollup-plugin-typescript2"
import pluginAnalyzeDeps from "~/lib/rollup-plugin-analyze-deps"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import resolve from "@rollup/plugin-node-resolve"
import * as util from "@thesunny/script-utils"
import { onwarn } from "../onwarn"

const INPUT_PATH = "editor/index.tsx"

async function build() {
  try {
    /**
     * Clear directories
     */
    util.title("Analyze Dependencies")
    // util.emptyDir(ANALYZE_DIR)

    /**
     * Run Rollup with `pluginAnalyzeDeps` as last plugin to do the analysis.
     */
    await rollup({
      input: INPUT_PATH,
      plugins: [
        /**
         * ## Removed most processing
         *
         * Removed most of the processing because it's not required to do the
         * analysis. Trying to keep this simple so there is less opportunity for
         * breakage.
         */
        /**
         * We include `resolve` and set these options. Without them we end up
         * with a chatty terminal.
         */
        resolve({
          preferBuiltins: true,
          browser: true,
        }),
        /**
         * JSON processing
         */
        json(),
        /**
         * `commonjs` must come after `resolve`
         * <https://github.com/axios/axios/issues/1259>
         */
        commonjs(),
        typescript({
          tsconfig: "tsconfig.rollup.json",
        }),
        pluginAnalyzeDeps({
          packagePath: "package.json",
          destPackages: ["../react/package.json"],
        }),
      ],
      onwarn,
    })

    /**
     * Run Analysis
     */
    // await rollup({
    //   input: INPUT_PATH,
    //   plugins: plugins({
    //     analysisCachePath: ANALYZE_CACHE_PATH,
    //   }),
    //   onwarn,
    // })

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
