import { Editor, Element } from "slate"
import { assertDefined } from "~/lib/assert-defined"

/**
 * If we are at the beginning of a table cell, disable delete backward
 */
export function deleteBackwardInTd(editor: Editor): boolean {
  const tdNodeEntry = Editor.above(editor, {
    match: (n) => Element.isElement(n) && n.type === "td",
  })
  if (tdNodeEntry == null) return false
  assertDefined(editor.selection?.anchor, "editor.selection.anchor")
  const isStart = Editor.isStart(
    editor,
    editor.selection.anchor,
    tdNodeEntry[1]
  )
  return isStart
}

/**
 * If we are at the end of a table cell, disable delete forward
 */
export function deleteForwardInTd(editor: Editor): boolean {
  const tdNodeEntry = Editor.above(editor, {
    match: (n) => Element.isElement(n) && n.type === "td",
  })
  if (tdNodeEntry == null) return false
  assertDefined(editor.selection, "editor.selection")
  const isEnd = Editor.isEnd(editor, editor.selection.anchor, tdNodeEntry[1])
  return isEnd
}
