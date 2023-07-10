import { RenderElementProps } from "slate-react"
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

export function createRenderElement(
  originalFn: EditableProps["renderElement"],
  plugins: BasePluginPolicy[]
): NonNullable<EditableProps["renderElement"]> {
  const fns = plugins
    .map((plugin) => plugin.editableProps?.renderElement)
    .filter(defined)
  return function renderElement(
    renderElementProps: RenderElementProps
  ): JSX.Element {
    for (const fn of fns) {
      const result = fn(renderElementProps)
      if (result) return result
    }
    if (originalFn === undefined) {
      throw new Error(
        `Element with type ${renderElementProps.element.type} not handled. Note that renderElement is not defined on SinkEditable so this is only the result of checking the Sink Plugins.`
      )
    }
    return originalFn(renderElementProps)
  }
}
