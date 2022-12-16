import { BaseEditor, Element, Node } from "slate"

import { BasePluginCustomTypes, PluginObject, SinkEditor } from "../types"

/**
 * Creates an overrideable editor action like `insertBreak` or `deleteBackward`
 * that usually returns `void` and creates a new version of the action that
 * adds the action from the plugin.
 *
 * If the plugin returns `true` it takes the result and returns it.
 *
 * If the plugin returns `false`, it tries the next one.
 *
 * If no plugin handles the result, it executed the original action.
 */
export function createVoidAction<
  K extends
    | "normalizeNode"
    | "deleteBackward"
    | "deleteForward"
    | "deleteFragment"
    | "insertBreak"
    | "insertFragment"
    | "insertNode"
    | "insertText"
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

/**
 * Creates an overrideable editor action that takes a `Node` and returns a
 * `boolean` and creates a new version of the action that incorporates the
 * plugins.
 *
 * If the plugin returns a boolean, it takes the result and returns it.
 *
 * If the plugin returns undefined, it tries the next one.
 *
 * If no plugin handles the result, it returns the result of the original action.
 */
export function createBooleanAction<
  K extends
    | "isVoid"
    | "isInline"
    | "isMaster"
    | "isConvertible"
    | "isSlave"
    | "isStandalone"
>(
  editor: BaseEditor & SinkEditor,
  actionKey: K,
  plugins: PluginObject<BasePluginCustomTypes>[]
): (node: Element) => boolean {
  const originalAction = editor[actionKey]
  const actionPlugins = plugins.filter((plugin) => plugin.editor?.[actionKey])
  return function nextBooleanAction(node: Node): boolean {
    for (const plugin of actionPlugins) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const result = plugin.editor?.[actionKey]?.(node)
      if (typeof result === "boolean") return result
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return originalAction(node)
  }
}
