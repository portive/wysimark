const dotenv = require("dotenv")

let env

/**
 * Environment Variables
 *
 * If `process.env.DOTENV` is provided, use it to load a `doetenv` file.
 *
 * If we are in development mode, then `DOTENV` is required.
 *
 * NOTE: Next.js has a built in way to set environment variables using a file
 * like `.env.local`. We opted out of this for a few reasons:
 *
 * - We adopted a convention of directory starting with `.` to not be committed
 *   git and this allows us to follow that convention.
 * - It doesn't pollute the root directory with more configurations
 * - We can create as many `.env` files as needed for local, test, production
 * - Syntax highlighting works when file ends in `.env`
 */

const data = dotenv.config({ path: process.env.DOTENV })
if (data.error) {
  throw new Error(data.error)
}
env = data.parsed

console.log("Environment Variables", env)

module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  env,
}
