import chalk from "chalk"
import { Plugin } from "rollup"
import typescript from "rollup-plugin-typescript2"
import {
  ModuleInfo,
  analyzeDeps,
  cleanModuleInfo,
} from "~/lib/rollup-analyze-deps"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import resolve from "@rollup/plugin-node-resolve"
import * as util from "@thesunny/script-utils"

/**
 * NOTE:
 *
 * Adding `typescriptDeclarations` affects the time to compile by only a few
 * seconds (about 10% of the build time)
 *
 * Tested on December 6, 2021 at 41.2s vs 46.7s
 */
export function plugins({ analysisPath }: { analysisPath: string }) {
  const pluginsArray: (Plugin | undefined)[] = [
    /**
     * ## Removed most processing
     *
     * Removed most of the processing because it's not required to do the
     * analysis. Trying to keep this simple so there is less opportunity for
     * breakage.
     */
    // replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
    resolve({
      // jsnext: true,
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
    /**
     * This plugin generates an html file at a default `stats.html` in the
     * same directory as `package.json` (i.e. where rollup is called from)
     *
     * https://github.com/btd/rollup-plugin-visualizer
     */
    {
      name: "lib/rollup-analyze-deps",
      buildEnd(error) {
        if (error) {
          console.error("Error in analyze")
          return
        }
        util.heading("buildEnd")
        const moduleIds = this.getModuleIds()
        const nodeModules: ModuleInfo[] = []
        for (const moduleId of moduleIds) {
          if (isNodeModule(moduleId)) {
            const m = this.getModuleInfo(moduleId)
            if (m) {
              nodeModules.push(cleanModuleInfo(m as any))
            }
          }
        }
        util.writeFile(analysisPath, JSON.stringify(nodeModules, null, 2))
        const pkg = JSON.parse(util.readFile("package.json"))

        analyzeDeps(nodeModules, pkg.dependencies)

        console.log(
          chalk.whiteBright(
            `NOTE: We expect to see these transitive peer dependencies in "Unused dependencies"\n`
          )
        )
        console.log("@fortawesome/fontawesome-common-types")
        console.log("@fortawesome/fontawesome-svg-core\n")
      },
    },
  ]
  return pluginsArray
}

function isNodeModule(id: string) {
  if (id.includes("node_modules")) return true
  if (id.match(/^[^/]/)) return true
  return false
}
