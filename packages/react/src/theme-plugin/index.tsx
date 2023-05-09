import { Global } from "@emotion/react"

import { createPlugin, TypedPlugin } from "~/src/sink"

import { globalStyles } from "./global-styles"

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
          <Global styles={globalStyles} />
          <Editable {...attributes} />
        </>
      )
    },
    editableProps: {},
  }
}) as TypedPlugin<ThemePluginCustomTypes>
