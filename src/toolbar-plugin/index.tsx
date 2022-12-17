import { createPlugin } from "~/src/sink"

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
      editableProps: {},
    }
  })
