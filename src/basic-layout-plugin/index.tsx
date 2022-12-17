import { createPlugin } from "~/src/sink"

import { $Editable } from "./styles"

export type BasicLayoutEditor = {
  basicLayout: true
}

export type BasicLayoutPluginCustomTypes = {
  Name: "basic-layout"
  Editor: BasicLayoutEditor
}

export const BasicLayoutPlugin = () =>
  createPlugin<BasicLayoutPluginCustomTypes>((editor) => {
    editor.basicLayout = true
    return {
      name: "basic-layout",
      renderEditable: ({ attributes, Editable }) => {
        return <Editable as={$Editable} {...attributes} />
      },
      editor: {},
      editableProps: {},
    }
  })
