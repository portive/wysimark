/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const config = require("./jest.config")

/**
 * Disable type checking which speeds up test running from about 3000ms
 * on a tiny test to 122ms or a 250x speed up.
 *
 * We still get type checking in VSCode so it can be a good trade off.
 *
 * https://kulshekhar.github.io/ts-jest/docs/getting-started/options/
 */
config.globals["ts-jest"].isolatedModules = true

module.exports = config
