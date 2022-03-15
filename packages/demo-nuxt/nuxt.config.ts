import { defineNuxtConfig } from "nuxt3"

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  /**
   * We set `ssr` to false because when @wysimark/vue does not work on
   * the server.
   *
   * It looks like `ssr` does work properly if we use the `cjs` build instead
   * of the `esm` build.
   */
  ssr: false,

  vite: {
    resolve: {
      /**
       * This took several days to solve.
       *
       * https://vitejs.dev/config/#resolve-preservesymlinks
       *
       * What happens is that if there is a symlink in node_modules, vite thinks
       * that the destination is not a `node_modules` package. It then treats
       * it differently causing weird issues like:
       *
       * - With ESM files, it adds a `require("vue")` which breaks in the
       *   browser because it expected only `import` statements.
       * - With CJS files, an error that ends in ...does not provide an export
       *   named 'default'
       *
       */
      preserveSymlinks: true,
    },
  },
})
