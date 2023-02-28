import { createPlugin } from "~/src/sink"

import { createConvertElementMethods } from "./methods"

export type ConvertElementEditor = {
  convertElement: ReturnType<typeof createConvertElementMethods>
}

export type ConvertElementPluginCustomTypes = {
  Name: "convert-element"
  Editor: ConvertElementEditor
}

export const ConvertElementPlugin =
  createPlugin<ConvertElementPluginCustomTypes>((editor) => {
    editor.convertElement = createConvertElementMethods(editor)
    return {
      name: "convert-element",
    }
  })
