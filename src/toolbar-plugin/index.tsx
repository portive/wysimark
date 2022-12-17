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
      renderEditable: ({ attributes, Editable }) => {
        console.log(attributes)
        return (
          <div style={{ border: "10px solid orange" }}>
            <div>Toolbar</div>
            <Editable {...attributes} />
          </div>
        )
      },
      editableProps: {},
    }
  })
