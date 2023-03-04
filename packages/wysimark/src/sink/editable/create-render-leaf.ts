import { cloneElement } from "react"
import { RenderLeafProps } from "slate-react"
import { EditableProps } from "slate-react/dist/components/editable"

import { BasePluginPolicy } from "../types"
import { defined } from "./utils"

/**
 * Create the substituted `renderLeaf` method.
 *
 * Generally, we are looking for all the results from all the plugins and
 * SinkEditable and merge the results together by nesting the responses
 * starting from the first plugin on the outside to the `renderLeaf` method
 * on `SinkEditable` on the inside.
 */

export function createRenderLeaf(
  originalFn: EditableProps["renderLeaf"],
  plugins: BasePluginPolicy[]
): NonNullable<EditableProps["renderLeaf"]> {
  if (originalFn === undefined) {
    throw new Error(`renderLeaf was not defined on SinkEditable`)
  }

  /**
   * These get handled in reverse order. We wrap the last one around the
   * actual `Text` and the earlier ones wrap around those. This
   * feels more natural because the first plugin handles the outermost
   * and we work our way inward.
   */
  const fns = plugins
    .map((plugin) => plugin.editableProps?.renderLeaf)
    .filter(defined)
    .reverse()

  return function (renderLeafProps) {
    let value = originalFn({
      ...renderLeafProps,
      /**
       * We override this because `attributes` should only appear on the
       * uppermost leaf element if there are several nested ones and it's
       * possible that this won't be the uppermost leaf.
       *
       * We add attributes back on at the very end so no need to worry if
       * we omit it here.
       */
      attributes: {} as RenderLeafProps["attributes"],
    })
    for (const fn of fns) {
      const possibleValue = fn({
        ...renderLeafProps,
        children: value,
      })
      if (possibleValue) {
        value = possibleValue
      }
    }
    value = cloneElement(value, renderLeafProps.attributes) //{ key: 'your-unique-key-here' })
    return value
  }
}
