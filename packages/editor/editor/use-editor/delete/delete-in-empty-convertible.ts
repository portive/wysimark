import { Editor, Node, Transforms } from "slate"
import {
  focusAtEnd,
  focusAtStart,
  getNodeAfterIf,
  getNodeBeforeIf,
} from "~/editor/custom"
import { isConvertibleBlockElement, isSeamlessElement } from "~/editor/types"

function deleteInEmptyConvertible(
  editor: Editor,
  direction: "forward" | "backward"
) {
  console.log(1)
  /**
   * Check if the cursor is currently in an empty convertible and if it isn't
   * we don't want to handle it
   */
  const currentEntry = Editor.above(editor)
  if (currentEntry === undefined) return false
  const [el, path] = currentEntry
  if (!isConvertibleBlockElement(el)) return false
  const text = Node.string(el)
  if (text.length > 0) return false

  /**
   * Find the delete target and if it's a seamless element, we delete self
   * instead.
   */
  const deleteTargetEntry =
    direction === "backward"
      ? getNodeBeforeIf(editor, path)
      : getNodeAfterIf(editor, path)
  if (!deleteTargetEntry) return false
  if (!isSeamlessElement(deleteTargetEntry[0])) return false
  Transforms.delete(editor, { at: path })
  direction === "backward"
    ? focusAtEnd(editor, deleteTargetEntry[1])
    : focusAtStart(editor, path)
  return true
}

/**
 * If we are at
 */
export function deleteBackwardInEmptyConvertible(editor: Editor): boolean {
  return deleteInEmptyConvertible(editor, "backward")
}

export function deleteForwardInEmptyConvertible(editor: Editor): boolean {
  return deleteInEmptyConvertible(editor, "forward")
}
