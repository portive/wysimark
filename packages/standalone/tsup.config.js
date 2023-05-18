import { defineConfig } from "tsup"
export default defineConfig(() => {
  return {
    entry: ["./src/index.ts"],
    format: ["esm", "cjs", "iife"],
    target: ["es2020"],
    outExtension: (context) => {
      return { js: `.${context.format}.js` }
    },
    external: ["crypto"],
    // noExternal: [
    //   "mdast-util-definitions",
    //   "react",
    //   "react-dom",
    //   "remark-gfm",
    //   "remark-parse",
    //   "unified",
    //   "unist-util-visit",
    // ],
    dts: true,
    outDir: ".dist",
    sourcemap: true,
    splitting: true,
    // metafile: true,
    /**
     * The JSX files here assume that React is available as a global variable.
     * To make this work, we need to inject a shim that makes it available.
     *
     * https://github.com/egoist/tsup/issues/792
     */
    inject: ["./react-shim.js"],
    // onSuccess: "tsc --emitDeclarationOnly --declaration",
    tsconfig: "tsconfig.tsup.json",
    // minify: !options.watch,
  }
})
