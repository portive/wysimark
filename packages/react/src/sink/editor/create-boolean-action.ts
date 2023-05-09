import { Element, Node } from "slate"

import { BasePluginPolicy, FullSinkEditor } from "../types"

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
  K extends "isVoid" | "isInline" | "isMaster" | "isSlave" | "isStandalone"
>(
  editor: FullSinkEditor,
  actionKey: K,
  plugins: BasePluginPolicy[]
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
