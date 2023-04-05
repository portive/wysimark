import { createPlugin, TypedPlugin } from "~/src/sink"

import { GlobalStyles } from "./global-styles"

export type ThemeEditor = {
  theme: true
}

export type ThemePluginCustomTypes = {
  Name: "theme"
  Editor: ThemeEditor
}

export const ThemePlugin = createPlugin<ThemePluginCustomTypes>((editor) => {
  editor.theme = true
  return {
    name: "theme",
    editor: {},
    renderEditable: ({ attributes, Editable }) => {
      return (
        <>
          <GlobalStyles />
          <Editable {...attributes} />
        </>
      )
    },
    editableProps: {},
  }
}) as TypedPlugin<ThemePluginCustomTypes>
