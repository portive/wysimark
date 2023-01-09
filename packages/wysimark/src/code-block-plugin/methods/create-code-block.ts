import { Editor } from "slate"

import { insertRootElement } from "~/src/sink"

export function createCodeBlock(editor: Editor) {
  insertRootElement(editor, {
    type: "code-block",
    language: "javascript",
    children: [{ type: "code-block-line", children: [{ text: "" }] }],
  })
}
