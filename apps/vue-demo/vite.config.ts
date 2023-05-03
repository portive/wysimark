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
import dotenv from "dotenv"
import { defineConfig } from "vite"

export default defineConfig(() => {
  const result = dotenv.config({ path: "../../.env/local.env" })
  console.log(result.parsed?.PORTIVE_AUTH_TOKEN)
  return {
    define: {
      "process.env": JSON.stringify(result.parsed),
    },
    plugins: [vue()],
  }
})
