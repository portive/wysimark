import { Editor, Transforms } from "slate"

import { curryOne } from "~/src/sink"

import { parse } from "../../../../convert/src"

function pasteMarkdown(editor: Editor, markdown: string) {
  const fragment = parse(markdown)
  Transforms.insertNodes(editor, fragment)
}

export function createPasteMarkdownMethods(editor: Editor) {
  return {
    pasteMarkdown: curryOne(pasteMarkdown, editor),
  }
}
