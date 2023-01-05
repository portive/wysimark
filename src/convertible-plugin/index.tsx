import { createPlugin } from "~/src/sink"

import { createConvertibleMethods } from "./methods"

type ConvertibleMethods = ReturnType<typeof createConvertibleMethods>

export type ConvertibleEditor = {
  convertible: ConvertibleMethods
}

export type ConvertiblePluginCustomTypes = {
  Name: "convertible"
  Editor: ConvertibleEditor
}

export const ConvertiblePlugin = () =>
  createPlugin<ConvertiblePluginCustomTypes>((editor) => {
    editor.convertible = createConvertibleMethods(editor)
    return {
      name: "convertible",
    }
  })
