import beeper from "beeper"
import { rollup } from "rollup"
import * as util from "@thesunny/script-utils"
import { onwarn } from "../onwarn"
import { plugins } from "./analyze-plugins"

const INPUT_PATH = "editor/index.tsx"
const ANALYZE_DIR = "./.build/analyze"
const ANALYZE_CACHE_PATH = `${ANALYZE_DIR}/analysis.json`

async function build() {
  try {
    /**
     * Clear directories
     */
    util.title("Analyze Dependencies")
    util.emptyDir(ANALYZE_DIR)

    /**
     * Run Analysis
     */
    await rollup({
      input: INPUT_PATH,
      plugins: plugins({
        analysisCachePath: ANALYZE_CACHE_PATH,
      }),
      onwarn,
    })

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
