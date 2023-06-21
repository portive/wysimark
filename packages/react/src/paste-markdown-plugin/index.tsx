import { createPlugin, stopEvent, TypedPlugin } from "~/src/sink"

import { createPasteMarkdownMethods } from "./methods"

type PasteMarkdownMethods = ReturnType<typeof createPasteMarkdownMethods>

export type PasteMarkdownEditor = {
  pasteMarkdown: PasteMarkdownMethods
}

export type PasteMarkdownPluginCustomTypes = {
  Name: "paste-markdown"
  Editor: PasteMarkdownEditor
}

export const PasteMarkdownPlugin = createPlugin<PasteMarkdownPluginCustomTypes>(
  (editor) => {
    editor.pasteMarkdown = createPasteMarkdownMethods(editor)
    return {
      name: "paste-markdown",
      editor: {},
      editableProps: {
        onPaste(e) {
          const { types } = e.clipboardData
          if (types.length !== 1 || types[0] !== "text/plain") {
            return false
          }
          const markdown = e.clipboardData.getData("text/plain")
          editor.pasteMarkdown.pasteMarkdown(markdown)
          stopEvent(e)
          return true
        },
      },
    }
  }
) as TypedPlugin<PasteMarkdownPluginCustomTypes>
