import { defineConfig } from "tsup"

import config from "./tsup.base.config"

export default defineConfig({
  ...config,
  outDir: ".dist/browser",
  platform: "browser",
})
