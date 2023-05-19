import { defineConfig } from "tsup"

const baseConfig = defineConfig({
  entry: ["./src/index.ts"],
  format: ["esm", "cjs", "iife"],
  target: ["es2020"],
  outExtension: (context) => {
    return { js: `.${context.format}.js` }
  },
  sourcemap: true,
  splitting: true,
  /**
   * The JSX files here assume that React is available as a global variable.
   * To make this work, we need to inject a shim that makes it available.
   *
   * https://github.com/egoist/tsup/issues/792
   */
  inject: ["./react-shim.js"],
  /**
   * This is relative to the importing `tsup.config.ts` file and not this file.
   */
  tsconfig: "tsconfig.tsup.json",
})

export default defineConfig([
  /**
   * TypeScript types
   */
  {
    ...baseConfig,
    outDir: ".dist/types",
    dts: { only: true },
  },
  /**
   * build for Node platform
   */
  {
    ...baseConfig,
    outDir: ".dist/node",
    platform: "node",
  },
  /**
   * build for browser platform
   */
  {
    ...baseConfig,
    outDir: ".dist/browser",
    platform: "browser",
  },
])
