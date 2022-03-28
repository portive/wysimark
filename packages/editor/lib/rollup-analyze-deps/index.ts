import { rollup } from "rollup"
import typescript from "rollup-plugin-typescript2"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import resolve from "@rollup/plugin-node-resolve"
import pluginAnalyzeDeps from "./rollup-plugin-analyze-deps"
import { onwarn } from "./utils"

export async function analyzeDependencies({
  inputPath,
}: {
  inputPath: string
}) {
  /**
   * Run Analysis
   */
  await rollup({
    input: inputPath,
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
      pluginAnalyzeDeps({ packagePath: "package.json" }),
    ],
    onwarn,
  })
}
