import { createPlugin } from "~/src/sink"

import { renderEditable } from "./render-editable"

export type ToolbarEditor = {
  toolbar: true
}

export type ToolbarPluginCustomTypes = {
  Name: "toolbar"
  Editor: ToolbarEditor
}

export const ToolbarPlugin = () =>
  createPlugin<ToolbarPluginCustomTypes>((editor) => {
    editor.toolbar = true
    return {
      name: "toolbar",
      editor: {},
      renderEditable,
      editableProps: {},
    }
  })
