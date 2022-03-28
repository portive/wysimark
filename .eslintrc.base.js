module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "no-secrets"],
  rules: {
    /**
     * There are still a few places where we allow for `any`.
     */
    "@typescript-eslint/no-explicit-any": "off",
    /**
     * We don't require explicit return types as sometimes we want them
     * drived from the function.
     */
    "@typescript-eslint/explicit-module-boundary-types": "off",
    /**
     * Don't allow eslint to pass if there is a `FIXME:` in the code
     */
    "no-warning-comments": [
      "error",
      { terms: ["FIXME:"], location: "anywhere" },
    ],
    /**
     * Looks for potentially added an accidental secret to the git repo.
     */
    "no-secrets/no-secrets": ["error", { tolerance: 4.6 }],
    /**
     * React being in Scope is not required in Next.js so we turn it off
     */
    "react/react-in-jsx-scope": "off",
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
  },
  ignorePatterns: ["cypress/**/*.js"],
}
