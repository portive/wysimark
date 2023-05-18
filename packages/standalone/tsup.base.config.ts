import { defineConfig } from "tsup"
export default defineConfig({
  entry: ["./src/index.ts"],
  format: ["esm", "cjs", "iife"],
  target: ["es2020"],
  outExtension: (context) => {
    return { js: `.${context.format}.js` }
  },
  outDir: ".dist",
  sourcemap: true,
  splitting: true,
  /**
   * The JSX files here assume that React is available as a global variable.
   * To make this work, we need to inject a shim that makes it available.
   *
   * https://github.com/egoist/tsup/issues/792
   */
  inject: ["./react-shim.js"],
  tsconfig: "tsconfig.tsup.json",
})
