import { Descendant } from "slate"

import { createPlugin, curryOne } from "~/src/sink"

import { createClipMethods } from "./methods"
import { normalizeNode } from "./normalize-node"

type ClipMethods = ReturnType<typeof createClipMethods>

export type ClipEditor = {
  clip: ClipMethods
}

export type ClipElement = {
  type: "clip"
  children: Descendant[]
}

export type ClipPluginCustomTypes = {
  Name: "clip"
  Editor: ClipEditor
  Element: ClipElement
}

export const ClipPlugin = () =>
  createPlugin<ClipPluginCustomTypes>((editor) => {
    editor.clip = createClipMethods(editor)
    return {
      name: "clip",
      editor: {
        normalizeNode: curryOne(normalizeNode, editor),
      },
      editableProps: {},
    }
  })
