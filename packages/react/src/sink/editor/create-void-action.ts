import { BaseEditor } from "slate"

import { BasePluginPolicy } from "../types"

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
>(editor: BaseEditor, actionKey: K, plugins: BasePluginPolicy[]) {
  const originalAction = editor[actionKey]
  const actionPlugins = plugins.filter((plugin) => plugin.editor?.[actionKey])
  return function nextVoidAction(...args: Parameters<BaseEditor[K]>[]): void {
    let isHandled = false
    const afterHandledCallbacks: (() => void)[] = []
    for (const plugin of actionPlugins) {
      // @ts-ignore
      const response = plugin.editor?.[actionKey]?.(...args)
      if (typeof response === "function") {
        afterHandledCallbacks.push(response)
      } else if (response === true) {
        isHandled = true
        break
      }
    }
    if (!isHandled) {
      // @ts-ignore
      originalAction(...args)
    }
    afterHandledCallbacks.forEach((callback) => callback())
  }
}
