import { RenderPlaceholderProps } from "slate-react"
import { EditableProps } from "slate-react/dist/components/editable"

import { BasePluginPolicy } from "../types"
import { defined } from "./utils"

/**
 * Create the substituted `renderElement` method.
 *
 * Generally, we are looking for the first result from any plugin or on
 * SinkEditable and return the first one that returns a value only.
 *
 * Iterate over all the plugin `renderElement`. If they return nothing
 * then we go to the next one until we hit a result. If we don't hit a
 * result, then we go to the `renderElement` passed to the `SinkEditable`
 * component.
 */

export function createRenderPlaceholder(
  originalFn: EditableProps["renderPlaceholder"],
  plugins: BasePluginPolicy[]
): NonNullable<EditableProps["renderPlaceholder"]> | undefined {
  if (originalFn) return originalFn
  const fns = plugins
    .map((plugin) => plugin.editableProps?.renderPlaceholder)
    .filter(defined)
  if (fns.length === 0) return undefined
  return function (
    renderPlaceholderProps: RenderPlaceholderProps
  ): JSX.Element {
    if (fns.length > 1) {
      throw new Error(
        `Only one plugin can define renderPlaceholder but there are ${fns.length}`
      )
    }
    const fn = fns[0]
    if (fn == null) throw new Error(`Expected fn to be defined`)
    return fn(renderPlaceholderProps)
  }
}
