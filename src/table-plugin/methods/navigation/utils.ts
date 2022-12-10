import { Descendant, Editor, Element } from "slate"
import { ReactEditor } from "slate-react"

/**
 * This is named with `...Unreliable...` because at the beginning of a line
 * (e.g. the second line of a paragraph) the DOMRect returned will be for a
 * position at the end of the previous line.
 *
 * So why have an unreliable version? Because, there actually is no reliable
 * version and the unreliable one works in most cases. It's better than not
 * having an unreliable selection rect.
 *
 * So it's useful, but we need to handle the case where it's on the end of the
 * previous line instead of the beginning of the line.
 *
 * NOTE:
 *
 * Inserting a `span` and removing it does not work. We can kind of getting it
 * to work by inserting a span with some with (like has the letter "A") inside.
 * It will then sometimes switch the problem so that the DOMRect return is on
 * the next line instead of the previous; however, makes the cursor move into
 * the wrong position when cursoring down the right side and this is worse than
 * the problem is solves.
 */
export function getUnreliableSelectionRect(): DOMRect | null {
  const s = window.getSelection()
  if (!s) return null
  const range = s.getRangeAt(0)
  return range.getBoundingClientRect()
}

/**
 * Takes a Slate Element and returns a DOMRect representing the Element as
 * it is in the DOM.
 */
function getElementRect(editor: Editor, element: Descendant) {
  return ReactEditor.toDOMNode(editor, element).getBoundingClientRect()
}

export function checkIsInElement(editor: Editor, element: Element): boolean {
  /**
   * Get the unreliable selection rect. If there is no selection, we consider
   * that the selection is not in the last line which will usually indicates
   * default behavior.
   */
  const selectionRect = getUnreliableSelectionRect()
  if (!selectionRect) return false
  const elementRect = getElementRect(editor, element)
  return (
    selectionRect.right < elementRect.right &&
    selectionRect.left > elementRect.left &&
    selectionRect.bottom < elementRect.bottom &&
    selectionRect.top > elementRect.top
  )
}
