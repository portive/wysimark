import vue from "@vitejs/plugin-vue"
import { config } from "dotenv"
import { defineConfig } from "vite"

export default defineConfig(() => {
  const result = config({ path: "../../.env/local.env" })
  console.log(result.parsed?.PORTIVE_AUTH_TOKEN)
  return {
    define: {
      "process.env": JSON.stringify(result.parsed),
    },
    plugins: [vue()],
  }
})
