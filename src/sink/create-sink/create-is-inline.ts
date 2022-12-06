import { BaseEditor } from "slate"

import { BasePluginCustomTypes, PluginObject } from "../types"

type IsInline = BaseEditor["isInline"]

export function createIsInline(
  originalIsInline: IsInline,
  plugins: PluginObject<BasePluginCustomTypes>[]
) {
  const isInlinePlugins = plugins.filter((plugin) => plugin.editor?.isInline)
  return function nextIsInline(element: Parameters<IsInline>[0]) {
    for (const plugin of isInlinePlugins) {
      const value = plugin.editor?.isInline?.(element)
      if (value !== undefined) return value
    }
    return originalIsInline(element)
  }
}
