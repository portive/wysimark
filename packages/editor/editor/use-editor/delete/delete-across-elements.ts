import isEqual from "lodash/isEqual"
import { Editor, Path } from "slate"
import { isBlockElement } from "~/editor/types"

/**
 * Only allow deletes across element boundaries when they have the same parent
 *
 * If a delete crosses an element boundary at different levels, like say a
 * paragraph deleting into a `code-block` / `code-line`, the delete can end up
 * sucking that `code-line` out of the `code-block` into the `p` or visa
 * versa. This can be surprising to the user so we disable it.
 */
function deleteDynamicAroundNested(
  editor: Editor,
  direction: "forward" | "backward"
) {
  const currentLowestBlockEntry = Editor.above(editor, {
    mode: "lowest",
    match: isBlockElement,
  })

  /**
   * This will be true but useful for type narrowing
   */

  if (currentLowestBlockEntry === undefined) return false

  /**
   * Check if we are at the boundary of an element when deleting.
   *
   * If it's forward, we check if we are at the end.
   * If it's backward, we check if we are at the start.
   */

  const checkBoundary = direction === "forward" ? Editor.isEnd : Editor.isStart

  if (editor.selection == null) {
    throw new Error(`Expected editor.selection to be defined`)
  }

  const isBoundary = checkBoundary(
    editor,
    editor.selection.anchor,
    currentLowestBlockEntry[1]
  )

  if (!isBoundary) return false

  /**
   * Get the adjacent lowest element and check if it has the same parent as
   * the current one. We only want to allow a delete, when they share the
   * same parent otherwise Slate can behave in a surprising manner to the
   * user.
   **/

  const getAdjacent = direction === "forward" ? Editor.next : Editor.previous

  const adjacentLowestBlockEntry = getAdjacent(editor, {
    match: isBlockElement,
    mode: "lowest",
  })

  if (adjacentLowestBlockEntry === undefined) return false

  const sharesParent = isEqual(
    Path.parent(currentLowestBlockEntry[1]),
    Path.parent(adjacentLowestBlockEntry[1])
  )

  if (sharesParent) return false

  /**
   * If the current and next lowest nodes don't share a parent, that means
   * they are at different levels and this means we don't want the delete to
   * happen because the delete will shuffle things through different levels.
   */

  return true
}

/**
 * Only allow deletes across element boundaries when they have the same parent
 */
export function deleteBackwardAroundNested(editor: Editor): boolean {
  return deleteDynamicAroundNested(editor, "backward")
}

/**
 * Only allow deletes across element boundaries when they have the same parent
 */
export function deleteForwardAroundNested(editor: Editor): boolean {
  return deleteDynamicAroundNested(editor, "forward")
}
