import { Plugin, PluginContext } from "rollup"
import typescript from "rollup-plugin-typescript2"
import {
  CleanedModuleInfo,
  analyzeDeps,
  cleanModuleInfo,
} from "~/lib/rollup-analyze-deps"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import resolve from "@rollup/plugin-node-resolve"
import * as util from "@thesunny/script-utils"

/**
 * FIXME: Currently, we aren't copying the dependencies from `package.json`
 * into the NPM packages like `packages/react`, `packages/standalone` and
 * `packages/vue`
 */

/**
 * NOTE:
 *
 * Adding `typescriptDeclarations` affects the time to compile by only a few
 * seconds (about 10% of the build time)
 *
 * Tested on December 6, 2021 at 41.2s vs 46.7s
 */
export function plugins({ analysisCachePath }: { analysisCachePath: string }) {
  const pluginsArray: (Plugin | undefined)[] = [
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
        const nodeModules = getCleanedNodeModulesInfo(this)
        util.writeFile(analysisCachePath, JSON.stringify(nodeModules, null, 2))
        const pkg = JSON.parse(util.readFile("package.json"))

        analyzeDeps(nodeModules, pkg.dependencies)
      },
    },
  ]
  return pluginsArray
}

function getCleanedNodeModulesInfo(ctx: PluginContext): CleanedModuleInfo[] {
  const moduleIds = ctx.getModuleIds()
  const cleanedNodeModulesInfo: CleanedModuleInfo[] = []
  for (const moduleId of moduleIds) {
    if (isNodeModule(moduleId)) {
      const m = ctx.getModuleInfo(moduleId)
      if (m) {
        cleanedNodeModulesInfo.push(cleanModuleInfo(m))
      }
    }
  }
  return cleanedNodeModulesInfo
}

/**
 * Returns true if the `moduleId` indicates that this is a `node_modules`
 * package. Otherwise, it's an import from within the project itself.
 */
function isNodeModule(id: string) {
  if (id.includes("node_modules")) return true
  if (id.match(/^[^/]/)) return true
  return false
}
