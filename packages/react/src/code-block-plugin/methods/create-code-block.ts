import { Editor } from "slate"

import { insertRootElement } from "~/src/sink"

import { BuiltInLanguage } from "../types"

export function createCodeBlock(
  editor: Editor,
  { language }: { language: BuiltInLanguage }
) {
  insertRootElement(editor, {
    type: "code-block",
    language,
    children: [{ type: "code-block-line", children: [{ text: "" }] }],
  })
}
