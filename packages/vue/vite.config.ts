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
      external: ["vue"],
    },
  },
  plugins: [vue(), dts()],
})
