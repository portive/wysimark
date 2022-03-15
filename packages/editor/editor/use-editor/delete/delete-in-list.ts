import { Editor, Transforms } from "slate"
import { isListItemElement } from "~/editor/types"
import { assertDefined } from "~/lib/assert-defined"

/**
 * If we are at the beginning of a table cell, disable delete backward
 */
export function deleteBackwardInList(editor: Editor): boolean {
  const liEntry = Editor.above(editor, {
    match: isListItemElement,
  })
  /**
   * If not in a list, don't handle it
   */
  if (liEntry == null) return false
  const [liElement, liPath] = liEntry
  assertDefined(editor.selection, "editor.selection")
  const isStart = Editor.isStart(editor, editor.selection.anchor, liPath)
  if (!isStart) return false
  if (liElement.depth === 0) return false
  Transforms.setNodes(editor, { depth: liElement.depth - 1 }, { at: liPath })
  return true
}
