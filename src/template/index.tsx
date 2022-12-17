import { Descendant } from "slate"

import { createPlugin } from "~/src/sink"

export type ___Editor = {
  ___: true
}

export type ___Element = {
  type: "___"
  children: Descendant[]
}

export type ___PluginCustomTypes = {
  Name: "___"
  Editor: ___Editor
  Element: ___Element
}

export const ___Plugin = () =>
  createPlugin<___PluginCustomTypes>((editor) => {
    editor.___ = true
    return {
      name: "___",
      editor: {},
      editableProps: {},
    }
  })
