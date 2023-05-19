// module.exports = {
//   build: {
//     lib: {
//       entry: "src/index.js",
//       name: "my-package",
//       fileName: "index",
//     },
//     rollupOptions: {
//       external: ["lodash"],
//     },
//   },
// }

import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.vue",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    outDir: ".dist",
    sourcemap: true,
    rollupOptions: {
      external: ["vue", "react", "react-dom"],
    },
  },
  plugins: [
    vue(),
    dts({
      root: __dirname,
      entryRoot: "./src",
      cleanVueFileName: true,
      // tsConfigFilePath: "./tsconfig.json",
      /**
       * TODO: Skip all the errors which we shouldn't do.
       *
       * Currently, `vite-plugin-dts` is looking at everything in
       * "../wysimark/src" which has `tsx` files that are incompatible with
       * vue and causing errors. These shouldn't be parsed at all but they are
       * in their entirety.
       */
      skipDiagnostics: true,
    }),
  ],
})
