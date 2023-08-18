const fs = require("fs")
const path = require("path")

/**
 * Get the value of the `FAST` environment variable and use it to return the
 * value of `isolatedModules`. When `isolatedModules` is `true`, the tests will
 * run faster but will not perform full type checking on the test files.
 */
function getIsolatedModules() {
  switch (process.env.FAST) {
    case "1":
      return true
    case "0":
      return false
    default:
      throw new Error("FAST environment variable must be 0 or 1")
  }
}

const isolatedModules = getIsolatedModules()

const TSCONFIG_FILENAME = "tsconfig.ts-node.json"

/**
 * Make sure the file `tsconfig.ts-jest.json` was copied into the directory.
 * If it doesn't exist, even though we've specified it, jest will run without
 * it but the configuration would be incorrect leaving us with a hard to find
 * error.
 *
 * This throws an error earlier so we can copy `tsconfig.ts-jest.json` to fix
 * the error.
 */
function ensureTsconfigExists(tsconfigFilename) {
  if (!fs.existsSync(tsconfigFilename)) {
    throw new Error(`${tsconfigFilename} does not exist but is required.`)
  } else {
    console.log(
      `Using tsconfig "${path.join(process.cwd(), tsconfigFilename)}"`
    )
  }
}

// Use the function like this:
ensureTsconfigExists(TSCONFIG_FILENAME)

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  /**
   * To enable dotenv variables in unit tests, uncomment the following line
   * and make sure the `dotenv` package is installed.
   *
   * Create a `jest.setup.js` file in the package directory and add code similar
   * to the following.
   *
   * ```js
   * require("dotenv").config({ path: "../../.env/test.env" })
   * ```
   */
  // setupFiles: ["./jest.setup.js"],
  /**
   * Configuration for getting `ts-jest` running
   * https://github.com/kulshekhar/ts-jest
   */
  // preset: "ts-jest",
  testEnvironment: "node",
  /**
   * The `transform` and `transformIgnorePatterns` is necessary to support
   * `esm` modules.
   *
   * https://github.com/kulshekhar/ts-jest/issues/970
   */
  transform: {
    "^.+\\.[tj]sx?$": [
      "ts-jest",
      {
        /**
         * Change the tsconfig file used to `tsconfig.ts-jest.json`
         */
        tsconfig: TSCONFIG_FILENAME,
        /**
         * Use `esm` set to true
         */
        useESM: true,
        /**
         * `isolatedModules: false` is the default value but we add it here for
         * clarity. Because it is not isolated, full type checking is performed
         * on the test files. This makes the jest tests run slower but are more
         * complete. This slow version should always be used in tests that must
         * be passed before a deploy, for example, but `jest.fast.config.js`
         * is useful when wanting to quickly test and get responses.
         */
        isolatedModules,
      },
    ],
  },
  /**
   * By default, this is set to `node_modules` which means that files in
   * `node_modules` will NOT be transformed.
   *
   * This is a problem for `esm` modules because they need to be transformed to
   * work with jest which is expecing `commonjs` modules.
   *
   * For this reason, we remove `node_modules` from the
   * `transformIgnorePatterns` array.
   */
  transformIgnorePatterns: [],
  /**
   * Sometimes, our tests use temp files that we keep in a `.temp` directory.
   * These files are manipulated during the test and we don't want that to
   * cause the test to be run again.
   */
  watchPathIgnorePatterns: ["[.]temp"],
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
