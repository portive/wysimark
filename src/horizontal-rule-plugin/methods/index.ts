import { Editor } from "slate"

import { curry, insertRootElement } from "~/src/sink"

function insertHorizontalRule(editor: Editor) {
  return insertRootElement(editor, {
    type: "horizontal-rule",
    children: [{ text: "" }],
  })
}

export function createHorizontalRuleMethods(editor: Editor) {
  return {
    insertHorizontalRule: curry(insertHorizontalRule, editor),
  }
}
