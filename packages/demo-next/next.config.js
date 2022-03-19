const dotenv = require("dotenv")

let env

/**
 * If we are in development mode, we use `process.env.DOTENV` to give us a path
 * to a dotenv file.
 *
 * NOTE: Next.js has a built in way to set environment variables using a file
 * like `.env.local`. We opted out of this for a few reasons:
 *
 * - We adopted a convention of directory starting with `.` to not be committed
 *   git and this allows us to follow that convention.
 * - It doesn't pollute the root directory with more configurations
 * - We can create as many `.env` files as needed for dev, test, production
 * - Syntax highlighting works when file ends in `.env`
 */

if (process.env.NODE_ENV === "development") {
  const data = dotenv.config({ path: "../../.env/dev.env" })
  if (data.error) {
    throw new Error(data.error)
  }
  env = data.parsed
  console.log("loaded env data:", env)
}

module.exports = {
  /**
   * Sets `process.env` in Next.js
   */
  env,
  experimental: {
    /**
     * Allows us to load TypeScript files from outside the current directory.
     *
     * https://github.com/vercel/next.js/pull/22867
     */
    externalDir: true,
  },
}
