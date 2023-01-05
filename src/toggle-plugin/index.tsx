import { createPlugin } from "~/src/sink"

import { createToggleMethods } from "./methods"

type ToggleMethods = ReturnType<typeof createToggleMethods>

export type ToggleEditor = {
  toggle: ToggleMethods
}

export type TogglePluginCustomTypes = {
  Name: "toggle"
  Editor: ToggleEditor
}

export const TogglePlugin = () =>
  createPlugin<TogglePluginCustomTypes>((editor) => {
    editor.toggle = createToggleMethods(editor)
    return {
      name: "toggle",
    }
  })
