import { BaseEditor } from "slate"

import { BasePluginCustomTypes, PluginObject } from "../types"

type IsInline = BaseEditor["isInline"]

export function createIsInline(
  originalIsInline: IsInline,
  pluginObjects: PluginObject<BasePluginCustomTypes>[]
) {
  const isInlineMethods = pluginObjects
    .map((plugin) => plugin.editor?.isInline)
    .filter((isInline) => isInline !== undefined) as IsInline[]
  return function nextIsInline(element: Parameters<IsInline>[0]) {
    for (const isInlineMethod of isInlineMethods) {
      const value = isInlineMethod(element)
      if (value === undefined) continue
      return value
    }
    return originalIsInline(element)
  }
}
