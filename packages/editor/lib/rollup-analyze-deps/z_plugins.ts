import { Plugin } from "rollup"
import typescript from "rollup-plugin-typescript2"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import resolve from "@rollup/plugin-node-resolve"
import pluginAnalyzeDeps from "./rollup-plugin-analyze-deps"

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
// export function plugins({ analysisCachePath }: { analysisCachePath: string }) {
export function plugins() {
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
    pluginAnalyzeDeps(),
  ]
  return pluginsArray
}
