module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier", // uses `eslint-config-prettier`
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "no-secrets",
    "import",
    "simple-import-sort",
  ],
  rules: {
    /**
     * We want to allow @ts-ignore because if we are using it, it's because we
     * know what we are doing.
     */
    "@typescript-eslint/ban-ts-comment": "off",
    /**
     * We don't require explicit return types as sometimes we want them
     * derived from the function.
     */
    "@typescript-eslint/explicit-module-boundary-types": "off",
    /**
     * It's a common pattern to import a module as a single default value
     * and the current VS Code tooling doesn't allow us to automatically fix
     * this so leaving it in for now.
     */
    "import/no-named-as-default-member": "off",
    /**
     * Don't allow eslint to pass if there is a `FIXME:` in the code
     */
    "no-warning-comments": ["error", { terms: ["FIXME:"] }],
    /**
     * Looks for potentially added an accidental secret to the git repo.
     */
    "no-secrets/no-secrets": ["error", { tolerance: 4.6 }],
    /**
     * Not necessary to add prop types if we are using TypeScript
     */
    "react/prop-types": "off",
    /**
     * React being in Scope is not required in Next.js so we turn it off
     */
    "react/react-in-jsx-scope": "off",
    /**
     * Too much work to escape quotes and stuff in HTML for no noticeable gain
     */
    "react/no-unescaped-entities": "off",
    /**
     * Make sure imports are sorted
     */
    "simple-import-sort/imports": "error",
    /**
     * Make sure exports are sorted
     */
    "simple-import-sort/exports": "error",
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        /**
         * Disable rejection of `require` in JavaScript files often used for
         * configuration. This TypeScript rule is being erroneously applied to
         * JavaScript files and this disables it. In the future, I presume
         * this might be fixed so try removing this rule once in a while to
         * see if they fixed the issue.
         */
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
  settings: {
    react: {
      /**
       * Automatically detect which version of React. If we remove this, we get
       * a warning. In the future, it says that this will default to "detect"
       * in the future and then we can remove this.
       */
      version: "detect",
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      /**
       * Enables `eslint-import-resolver-typescript`.
       * Resolves paths in `tsconfig.json` like `~/`.
       */
      typescript: {},
      /**
       * Enables `eslint-import-resolver-node`.
       */
      node: {},
    },
  },
}
