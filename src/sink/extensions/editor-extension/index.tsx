import { BaseEditor } from "slate"

import {
  ArraySafePluginCustomTypes,
  PluginObject,
  SinkEditor,
} from "../../types"
import { Extension } from ".."
import { createBooleanAction } from "./create-boolean-action"
import { createVoidAction } from "./create-void-action"

export const EditorExtension: Extension = {
  extendEditor: (
    editor: BaseEditor & SinkEditor<ArraySafePluginCustomTypes>,
    plugins: PluginObject<ArraySafePluginCustomTypes>[]
  ) => {
    /**
     * Create the default for SinkEditor methods if they don't already exist.
     */
    editor.isMaster = "isMaster" in editor ? editor.isMaster : () => false
    editor.isConvertible =
      "isConvertible" in editor ? editor.isConvertible : () => false
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
      isConvertible: createBooleanAction(editor, "isConvertible", plugins),
      isSlave: createBooleanAction(editor, "isSlave", plugins),
      isStandalone: createBooleanAction(editor, "isStandalone", plugins),
    })
  },
}
