import { BaseEditor, Editor } from "slate"

import { BasePluginCustomTypes, PluginObject } from "../types"

type InsertBreak = () => void
type IsInline = BaseEditor["isInline"]
type IsVoid = BaseEditor["isVoid"]

/**
 * Creates an overrideable editor action like `insertBreak` or `deleteBackward`
 * that usually returns `void` and creates a new version of the action that
 * adds the action from the plugin.
 */
export function createVoidAction<
  K extends
    | "deleteBackward"
    | "deleteForward"
    | "deleteFragment"
    | "insertBreak"
    | "insertFragment"
    | "insertNode"
>(
  editor: BaseEditor,
  actionKey: K,
  plugins: PluginObject<BasePluginCustomTypes>[]
) {
  const originalAction = editor[actionKey]
  const actionPlugins = plugins.filter((plugin) => plugin.editor?.[actionKey])
  return function nextVoidAction(...args: Parameters<BaseEditor[K]>[]): void {
    for (const plugin of actionPlugins) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const isHandled = plugin.editor?.[actionKey]?.(...args)
      if (isHandled) return
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    originalAction(...args)
  }
}

export function createInsertBreak(
  originalInsertBreak: InsertBreak,
  plugins: PluginObject<BasePluginCustomTypes>[]
) {
  const insertBreakPlugins = plugins.filter((plugin) => plugin.editor?.isInline)
  return function nextInsertBreak(): void {
    for (const plugin of insertBreakPlugins) {
      const isHandled = plugin.editor?.insertBreak?.()
      if (isHandled) return
    }
    originalInsertBreak()
  }
}

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
