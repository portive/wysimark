import { BaseEditor } from "slate"

import { BasePluginFn, ExtractedPluginSchema, FullSinkEditor } from "../types"
import { createBooleanAction } from "./create-boolean-action"
import { createVoidAction } from "./create-void-action"

export function createWithSink<T extends ExtractedPluginSchema>(
  pluginFns: BasePluginFn[]
) {
  /**
   * The `editor` in the props can be a `BaseEditor` but we transform it
   * into a `SinkEditor` before returning it.
   */
  return <E extends BaseEditor>(
    originalEditor: E,
    options: T["Options"]
  ): E & FullSinkEditor => {
    const editor = originalEditor as E & FullSinkEditor

    /**
     * Executes the plugin on the `editor` with every one of the
     * `pluginFunctions` to get the `pluginObject`
     */
    const plugins = pluginFns.map((plugin) =>
      plugin(editor, options, { createPolicy: (x) => x })
    )
    editor.sink = { plugins }

    /**
     * Create the default for SinkEditor methods if they don't already exist.
     */
    editor.isMaster = "isMaster" in editor ? editor.isMaster : () => false
    editor.isSlave = "isSlave" in editor ? editor.isSlave : () => false
    editor.isStandalone =
      "isStandalone" in editor ? editor.isStandalone : () => false

    Object.assign(editor, {
      /**
       * void
       */
      normalizeNode: createVoidAction(editor, "normalizeNode", plugins),
      deleteBackward: createVoidAction(editor, "deleteBackward", plugins),
      deleteForward: createVoidAction(editor, "deleteForward", plugins),
      deleteFragment: createVoidAction(editor, "deleteFragment", plugins),
      insertBreak: createVoidAction(editor, "insertBreak", plugins),
      insertFragment: createVoidAction(editor, "insertFragment", plugins),
      insertNode: createVoidAction(editor, "insertNode", plugins),
      insertText: createVoidAction(editor, "insertText", plugins),
      /**
       * boolean
       */
      isInline: createBooleanAction(editor, "isInline", plugins),
      isVoid: createBooleanAction(editor, "isVoid", plugins),
      isMaster: createBooleanAction(editor, "isMaster", plugins),
      isSlave: createBooleanAction(editor, "isSlave", plugins),
      isStandalone: createBooleanAction(editor, "isStandalone", plugins),
    })

    return editor
  }
}
