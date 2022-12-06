import { BaseEditor } from "slate"

import { BasePluginCustomTypes, PluginObject } from "../types"

type IsInline = BaseEditor["isInline"]
type IsVoid = BaseEditor["isVoid"]

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

/**
 * NOTE:
 * NOT BEING USED YET!
 */
export function createIsVoid(
  originalIsVoid: IsVoid,
  plugins: PluginObject<BasePluginCustomTypes>[]
) {
  const isVoidPlugins = plugins.filter((plugin) => plugin.editor?.isVoid)
  return function nextIsInline(element: Parameters<IsInline>[0]) {
    for (const plugin of isVoidPlugins) {
      const value = plugin.editor?.isVoid?.(element)
      if (value !== undefined) return value
    }
    return originalIsVoid(element)
  }
}
