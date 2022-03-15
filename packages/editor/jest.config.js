/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const fs = require("fs")

if (!fs.existsSync("tsconfig.ts-jest.json")) {
  throw new Error("tsconfig.ts-jest.json does not exist but is required.")
}

module.exports = {
  globals: {
    "ts-jest": {
      /**
       * Change the tsconfig file used to `tsconfig.ts-jest.json`
       */
      tsconfig: "tsconfig.ts-jest.json",
      /**
       * `isolatedModules: false` is the default value but we add it here for
       * clarity. Because it is not isolated, full type checking is performed
       * on the test files. This makes the jest tests run slower but are more
       * complete. This slow version should always be used in tests that must
       * be passed before a deploy, for example, but `jest.fast.config.js`
       * is useful when wanting to quickly test and get responses.
       */
      isolatedModules: false,
    },
  },
  /**
   * Configuration for getting `ts-jest` running
   * https://github.com/kulshekhar/ts-jest
   */
  preset: "ts-jest",
  testEnvironment: "node",
  /**
   * Customized section for this project
   */
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/$1",
  },
  modulePathIgnorePatterns: [
    "_methods[.]ts",
    "<rootDir>/.build/",
    "<rootDir>/cypress/",
  ],
  setupFiles: ["./jest.setup.js"],
}
