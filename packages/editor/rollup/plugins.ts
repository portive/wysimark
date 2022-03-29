import { Plugin } from "rollup"
import analyzer from "rollup-plugin-analyzer"
import filesize from "rollup-plugin-filesize"
// import nodeGlobals from "rollup-plugin-node-globals"
// import nodePolyfills from "rollup-plugin-node-polyfills"
import replace from "rollup-plugin-replace"
// import sizes from "rollup-plugin-sizes"
import { terser as terserPlugin } from "rollup-plugin-terser"
import typescript from "rollup-plugin-typescript2"
import { visualizer as visualizerPlugin } from "rollup-plugin-visualizer"
import vuePlugin from "rollup-plugin-vue"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import resolve from "@rollup/plugin-node-resolve"
import * as util from "@thesunny/script-utils"
import { analyzeRollup } from "../lib/analyze-rollup"

/**
 * NOTE:
 *
 * Adding `typescriptDeclarations` affects the time to compile by only a few
 * seconds (about 10% of the build time)
 *
 * Tested on December 6, 2021 at 41.2s vs 46.7s
 */
export function plugins(
  {
    terser = false,
    typescriptDeclarations = false,
    visualizer = false,
    analyzerDest = null,
  }: {
    terser?: boolean
    typescriptDeclarations?: boolean
    visualizer?: boolean
    analyzerDest?: null | string
  } = {
    terser: false,
    typescriptDeclarations: false,
    visualizer: false,
    analyzerDest: null,
  }
) {
  const pluginsArray: (Plugin | undefined)[] = [
    /**
     * React error process is not defined
     * <https://github.com/rollup/rollup/issues/487>
     */
    replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
    /**
     * The three arguments jsnext, preferBuiltins and browser are used to get
     * it to work with axios.
     *
     * <https://github.com/axios/axios/issues/1259>
     * <https://aleemisiaka.com/blog/configure-axios-rollup/>
     *
     * TODO:
     *
     * - If we don't include the `resolve`, then Vue breaks because it is
     *   looking for `process`
     * - If we do include the `resolve`, then Standalone breaks because it is
     *   looking for `document.head` in `@emotion/core`'s `createCache` method.
     *
     * This is breaking the React rollup because it assumes the final file
     * will run in the browser. For @emotion/core, there is a `createCache`
     * method that looks for `document.head` if `isBrowser`.
     *
     * The options required to make axios work, also make `emotion/core` think
     * it's in the browser and skips the `isBrowser` check. Therefore, it
     * runs `document.head` without the `isBrowser` check and promptly crashes.
     *
     * The solution will be to somehow figure out how to make `axios` think
     * it is in the browser but `@emotion/core` not know where it is (browser
     * or server)
     *
     * WORKAROUND:
     *
     * The current workaround is to make `axios` a dependency instead of
     * rolling it up.
     *
     * HINT:
     *
     * This is REQUIRED in order for `wysimark-vue-3-src` to work because
     * otherwise it cannot find `process`. Specifically code where it says
     * something like `miniproc = process` which fails.
     */
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
     * For processing `.vue` files
     */
    vuePlugin(),
    /**
     * `commonjs` must come after `resolve`
     * <https://github.com/axios/axios/issues/1259>
     */
    commonjs(),
    /**
     * For some reason, somewhere in `~/lib/convert` something calls in `path`
     *
     * This issue appears when trying to run the dev server in
     * `wysimark-vue-3-src` as an example after we `yarn build:standalone`.
     *
     * HINT:
     *
     * If the `wysimark-vue-3-src` works without this polyfill after we do a
     * `yarn build:standalone` then we may be able to remove this.
     *
     * Even if we remove it, I recommend we leave this comment here so we know
     * how to resolve ths issue if it ever appears again.
     */
    // nodePolyfills(),
    /**
     * If we don't include this, we get a can't find global.XMLHttpRequest
     * error when building the standalone version of Wysimark. You can check
     * this by looking at `http://localhost:3005/demos/standalone-from-symlinked-package`
     * after doing a `yarn build:standalone` from the `wysimark-monorepo` root.
     *
     * HINT:
     *
     * If the `standalone-from-symlinked-package` demo page can be made to run
     * after doing a build and checking that it is indeed a new build, this
     * plugin can probably be removed at that point.
     *
     * HINT:
     *
     * Leaving this here in case we run across a problem that this resolves so
     * we don't have to hunt for the solution again.
     */
    // nodeGlobals(),
    /**
     * Some libraries like `slate` use babel to transpile the results:
     *
     * <https://github.com/ianstormtaylor/slate/blob/main/config/rollup/rollup.config.js>
     *
     * We aren't at the moment but leaving this code in, in case I want to
     * consider using it for the future. The main question I wonder is why they
     * were using this in the first place as I somehow got it to work without
     * babel.
     *
     * HINT:
     *
     * Probably leave this comment here so we remember that we don't use babel
     * and that there is more than one method to do a build. Most likely
     * babel is used for typescript.
     */
    // babel(),
    typescript({
      tsconfig: "tsconfig.rollup.json",
      tsconfigOverride: {
        compilerOptions: {
          /**
           * Next.js likes the value `jsx: preserve`.
           *
           * For rollup only, we override this to be `jsx: react`
           *
           * <https://www.npmjs.com/package/rollup-plugin-typescript2>
           */
          // jsx: "react",
          /**
           * We don't need declarations for Next.js but we may want them for the
           * rollup.
           */
          declaration: typescriptDeclarations,
          /**
           * NOTE:
           *
           * We can't override `declarationDir`
           */
          // declarationDir: ''
        },
      },
    }),
    terser ? terserPlugin() : undefined,
    /**
     * This plugin generates an html file at a default `stats.html` in the
     * same directory as `package.json` (i.e. where rollup is called from)
     *
     * https://github.com/btd/rollup-plugin-visualizer
     */
    visualizer ? visualizerPlugin({ sourcemap: true }) : undefined,
    /**
     * Show the final bundle size including the minified size and the gzipped
     * size.
     */
    // sizes(),
    /**
     * Show the individual packages and stuff
     */
    filesize(),
    /**
     * http://rollup-plugin-analyzer.doesdev.com/#options
     */
    analyzer({
      stdout: false,
      showExports: true,
      filter: "/node_modules/",
      writeTo(text) {
        /**
         * Write the full analysis to disk
         */
        if (typeof analyzerDest === "string") {
          util.writeFile(`${analyzerDest}.txt`, text)
        }
      },
      onAnalysis(analysis) {
        util.heading("Analysis")
        if (typeof analyzerDest === "string") {
          util.writeFile(
            `${analyzerDest}.json`,
            JSON.stringify(analysis, null, 2)
          )
        }
        const summary = analyzeRollup(analysis.modules as any)
        console.log(summary)
        util.heading("End Analysis")
      },
    }),
  ]
  return pluginsArray
}
