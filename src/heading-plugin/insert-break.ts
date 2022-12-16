import { Editor, Path, Range, Transforms } from "slate"

import { findElementUp } from "../sink"
import { HeadingElement } from "./types"

export function insertBreak(editor: Editor) {
  const entry = findElementUp<HeadingElement>(editor, "heading")
  if (!entry) return false
  if (!editor.selection) return false
  if (Range.isExpanded(editor.selection)) return false
  if (!Editor.isEnd(editor, editor.selection.anchor, entry[1])) return false
  const nextPath = Path.next(entry[1])
  Transforms.insertNodes(
    editor,
    { type: "paragraph", children: [{ text: "" }] },
    { at: nextPath }
  )
  Transforms.select(editor, {
    anchor: Editor.start(editor, nextPath),
    focus: Editor.start(editor, nextPath),
  })
  return true
}
