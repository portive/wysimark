import helpersConfig from "handlebars-helpers"
import { NodePlopAPI } from "plop"

/**
 * Register handlebar helpers with plop
 *
 * https://github.com/plopjs/plop/issues/281
 */
const helpers = helpersConfig()
export function registerHandleBarHelpers(plop: NodePlopAPI): void {
  for (const prop in helpers) {
    // if it is not an already included "case" helper, than add the helper to plop
    if (!prop.toLowerCase().includes("case")) {
      plop.setHelper(prop, helpers[prop])
    }
  }

  // overwrite "raw" helper afterwards, because it's not able to
  // avoid escaping of {{{{raw}}}} block content otherwise
  plop.setHelper("raw", (options: Handlebars.HelperOptions) => {
    return options.fn(undefined)
  })
}
