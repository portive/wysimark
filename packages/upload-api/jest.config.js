/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const fs = require("fs")

/**
 * Make sure the file `tsconfig.ts-jest.json` was copied into the directory.
 * If it doesn't exist, even though we've specified it, jest will run without
 * it but the configuration would be incorrect leaving us with a hard to find
 * error.
 *
 * This throws an error earlier so we can copy `tsconfig.ts-jest.json` to fix
 * the error.
 */
if (!fs.existsSync("tsconfig.ts-jest.json")) {
  console.log()
  throw new Error("tsconfig.ts-jest.json does not exist but is required.")
}

module.exports = {
  setupFiles: ["./jest.setup.js"],
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
   * This needs to match the `paths` entry in `tsconfig.base.json` or
   * `tsconfig.custom.json`.
   *
   * TODO: Use `jest-module-name-mapper` to create mappings from tsconfig
   */
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/$1",
  },
}
