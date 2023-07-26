const customConfig = require("eslint-config-custom")

/**
 * The changes here are to remove React from eslintrc to get rid of the React
 * warnings for this `vue-demo` app.
 */

// Remove the 'settings.react' key
delete customConfig.settings.react

module.exports = {
  root: true,
  ...customConfig,
  // Remove 'plugin:react/recommended' from the extends array
  extends: customConfig.extends.filter((s) => s !== "plugin:react/recommended"),
  // Remove 'react' plugin from the plugins array
  plugins: customConfig.plugins.filter((plugin) => plugin !== "react"),
}
