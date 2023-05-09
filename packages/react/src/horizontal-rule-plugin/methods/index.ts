import { Editor } from "slate"

import { curryOne, insertRootElement } from "~/src/sink"

function insertHorizontalRule(editor: Editor) {
  return insertRootElement(editor, {
    type: "horizontal-rule",
    children: [{ text: "" }],
  })
}

export function createHorizontalRuleMethods(editor: Editor) {
  return {
    insertHorizontalRule: curryOne(insertHorizontalRule, editor),
  }
}
