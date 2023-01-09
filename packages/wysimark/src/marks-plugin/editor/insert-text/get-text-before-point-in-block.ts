import { Editor, Element, Point } from "slate"

import { findElementUp } from "~/src/sink"

/**
 * Takes a Point anywhere in the editor and returns the text text in the current
 * block before that Point in the editor.
 *
 * If the Point happens not to be in a Block or that Block is a Void block (i.e.
 * in which the `children` are not defactor text/inlines) then this function
 * returns `null`
 *
 * For clarity, we return `null` which is more explicit than `undefined`.
 */
export function getTextBeforePointInBlock(
  editor: Editor,
  point: Point
): string | null {
  /**
   * Make sure we are in a block and that the block is not void.
   */
  const blockEntry = findElementUp(
    editor,
    (node) =>
      Element.isElement(node) &&
      !Editor.isVoid(editor, node) &&
      Editor.isBlock(editor, node)
  )
  if (blockEntry == null) return null
  const range = {
    anchor: Editor.start(editor, blockEntry[1]),
    focus: point,
  }
  return Editor.string(editor, range)
}
