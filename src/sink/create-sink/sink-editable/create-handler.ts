import { EditableProps } from "slate-react/dist/components/editable"

import { ArraySafePluginCustomTypes, PluginObject } from "../../types"
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

export function createOnKeyDown(
  originalFn: EditableProps["onKeyDown"],
  plugins: PluginObject<ArraySafePluginCustomTypes>[]
): NonNullable<EditableProps["onKeyDown"]> {
  const fns = plugins
    .map((plugin) => plugin.editableProps?.onKeyDown)
    .filter(defined)
  return function (event) {
    for (const fn of fns) {
      if (fn(event)) return
    }
    originalFn?.(event)
  }
}

export function createOnPaste(
  originalFn: EditableProps["onPaste"],
  plugins: PluginObject<ArraySafePluginCustomTypes>[]
): NonNullable<EditableProps["onPaste"]> {
  const fns = plugins
    .map((plugin) => plugin.editableProps?.onPaste)
    .filter(defined)
  return function (event) {
    for (const fn of fns) {
      if (fn(event)) return
    }
    originalFn?.(event)
  }
}

export function createOnDrop(
  originalFn: EditableProps["onDrop"],
  plugins: PluginObject<ArraySafePluginCustomTypes>[]
): NonNullable<EditableProps["onDrop"]> {
  const fns = plugins
    .map((plugin) => plugin.editableProps?.onDrop)
    .filter(defined)
  return function (event) {
    for (const fn of fns) {
      if (fn(event)) return
    }
    originalFn?.(event)
  }
}
