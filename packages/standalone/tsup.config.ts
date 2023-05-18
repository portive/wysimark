import config from "../tsupconfig/tsup.config"

export default config

// import { defineConfig } from "tsup"

// const baseConfig = defineConfig({
//   entry: ["./src/index.ts"],
//   format: ["esm", "cjs", "iife"],
//   target: ["es2020"],
//   outExtension: (context) => {
//     return { js: `.${context.format}.js` }
//   },
//   outDir: ".dist",
//   sourcemap: true,
//   splitting: true,
//   /**
//    * The JSX files here assume that React is available as a global variable.
//    * To make this work, we need to inject a shim that makes it available.
//    *
//    * https://github.com/egoist/tsup/issues/792
//    */
//   inject: ["./react-shim.js"],
//   tsconfig: "tsconfig.tsup.json",
// })

// export default defineConfig([
//   {
//     ...baseConfig,
//     outDir: ".dist/node",
//     platform: "node",
//     dts: true,
//   },
//   {
//     ...baseConfig,
//     outDir: ".dist/browser",
//     platform: "browser",
//   },
// ])
