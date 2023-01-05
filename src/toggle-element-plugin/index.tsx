import { createPlugin } from "~/src/sink"

import { createToggleElementMethods } from "./methods"

type ToggleElementMethods = ReturnType<typeof createToggleElementMethods>

export type ToggleElementEditor = {
  toggleElement: ToggleElementMethods
}

export type ToggleElementPluginCustomTypes = {
  Name: "toggle-element"
  Editor: ToggleElementEditor
}

export const ToggleElementPlugin = () =>
  createPlugin<ToggleElementPluginCustomTypes>((editor) => {
    editor.toggleElement = createToggleElementMethods(editor)
    return {
      name: "toggle-element",
    }
  })
