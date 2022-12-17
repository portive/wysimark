import { BaseEditor } from "slate"

import {
  ArraySafePluginCustomTypes,
  PluginFunction,
  SinkEditor,
} from "../../types"
import { createBooleanAction } from "./create-boolean-action"
import { createVoidAction } from "./create-void-action"

export function createWithSink(
  pluginConfigs: PluginFunction<ArraySafePluginCustomTypes>[]
) {
  /**
   * The `editor` in the props can be a `BaseEditor` but we transform it
   * into a `SinkEditor` before returning it.
   */
  return <E extends BaseEditor>(
    originalEditor: E
  ): E & SinkEditor<ArraySafePluginCustomTypes> => {
    const editor = originalEditor as E & SinkEditor<ArraySafePluginCustomTypes>

    /**
     * Create the default for SinkEditor methods if they don't already exist.
     */
    editor.isMaster = "isMaster" in editor ? editor.isMaster : () => false
    editor.isConvertible =
      "isConvertible" in editor ? editor.isConvertible : () => false
    editor.isSlave = "isSlave" in editor ? editor.isSlave : () => false
    editor.isStandalone =
      "isStandalone" in editor ? editor.isStandalone : () => false

    /**
     * Executes the plugin on the `editor` with every one of the
     * `pluginFunctions` to get the `pluginObject`
     */
    const plugins = pluginConfigs.map((pluginConfig) => pluginConfig(editor))

    Object.assign(editor, {
      normalizeNode: createVoidAction(editor, "normalizeNode", plugins),
      deleteBackward: createVoidAction(editor, "deleteBackward", plugins),
      deleteForward: createVoidAction(editor, "deleteForward", plugins),
      deleteFragment: createVoidAction(editor, "deleteFragment", plugins),
      insertBreak: createVoidAction(editor, "insertBreak", plugins),
      insertFragment: createVoidAction(editor, "insertFragment", plugins),
      insertNode: createVoidAction(editor, "insertNode", plugins),
      insertText: createVoidAction(editor, "insertText", plugins),
      isInline: createBooleanAction(editor, "isInline", plugins),
      isVoid: createBooleanAction(editor, "isVoid", plugins),
      isMaster: createBooleanAction(editor, "isMaster", plugins),
      isConvertible: createBooleanAction(editor, "isConvertible", plugins),
      isSlave: createBooleanAction(editor, "isSlave", plugins),
      isStandalone: createBooleanAction(editor, "isStandalone", plugins),
    })

    editor.sink = {
      plugins: plugins,
      pluginsFor: {
        decorate: plugins.filter((plugin) => plugin.editableProps?.decorate),
        onKeyDown: plugins.filter((plugin) => plugin.editableProps?.onKeyDown),
        onKeyPress: plugins.filter(
          (plugin) => plugin.editableProps?.onKeyPress
        ),
        onKeyUp: plugins.filter((plugin) => plugin.editableProps?.onKeyUp),
        /**
         * These get handled in reverse order. We wrap the last one around the
         * actual `Editable` and the earlier ones wrap around those. This
         * feels more natural because the first plugin handles the outermost
         * and we work our way inward.
         */
        renderEditable: plugins
          .filter((plugin) => plugin.renderEditable)
          .reverse(),
        /**
         * These get handled in forward order. The first one that returns
         * handled the rendering.
         */
        renderElement: plugins.filter(
          (plugin) => plugin.editableProps?.renderElement
        ),
        /**
         * These get handled in reverse order. We wrap the last one around the
         * actual `Text` and the earlier ones wrap around those. This
         * feels more natural because the first plugin handles the outermost
         * and we work our way inward.
         */
        renderLeaf: plugins
          .filter((plugin) => plugin.editableProps?.renderLeaf)
          .reverse(),
      },
    }
    return editor
  }
}
