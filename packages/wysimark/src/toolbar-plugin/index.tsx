import { createPlugin, TypedPlugin } from "~/src/sink"

import { renderEditable } from "./render-editable"

export type ToolbarEditor = {
  toolbar: {
    height?: string | number
    minHeight?: string | number
    maxHeight?: string | number
  }
}

export type ToolbarOptions = {
  toolbar: {
    height?: string | number
    minHeight?: string | number
    maxHeight?: string | number
  }
}

export type ToolbarPluginCustomTypes = {
  Name: "toolbar"
  Editor: ToolbarEditor
  Options: ToolbarOptions
}

export const ToolbarPlugin = createPlugin<ToolbarPluginCustomTypes>(
  (editor, options) => {
    editor.toolbar = {
      height: options.toolbar?.height,
      minHeight: options.toolbar?.minHeight,
      maxHeight: options.toolbar?.maxHeight,
    }
    return {
      name: "toolbar",
      editor: {},
      renderEditable,
      editableProps: {},
    }
  }
) as TypedPlugin<ToolbarPluginCustomTypes>
