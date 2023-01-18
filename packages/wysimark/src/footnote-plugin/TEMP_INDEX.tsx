import { Descendant } from "slate"

import { createPlugin, curryOne } from "~/src/sink"

import { createFootnoteMethods } from "./methods"
import { normalizeNode } from "./normalize-node"

type FootnoteMethods = ReturnType<typeof createFootnoteMethods>

export type FootnoteEditor = {
  footnote: FootnoteMethods
}

export type FootnoteElement = {
  type: "footnote"
  children: Descendant[]
}

export type FootnotePluginCustomTypes = {
  Name: "footnote"
  Editor: FootnoteEditor
  Element: FootnoteElement
}

export const FootnotePlugin = () =>
  createPlugin<FootnotePluginCustomTypes>((editor) => {
    editor.footnote = createFootnoteMethods(editor)
    return {
      name: "footnote",
      editor: {
        normalizeNode: curryOne(normalizeNode, editor),
      },
      editableProps: {},
    }
  })
