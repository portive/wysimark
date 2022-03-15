import { Editor, Range } from "slate"
import { insertBreakInTd } from "./insert-break-in-td"
import { insertBreakInListItem } from "./insert-break-in-list-item"
import { insertBreakInConvertible } from "./insert-break-in-convertible"
import { insertBreakInCodeLine } from "./insert-break-in-code-line"

/**
 * Core enter handling
 */
export function insertBreak(editor: Editor, originalInsertBreak: () => void) {
  const { selection } = editor

  /**
   * If there is no selection or the range, use the default handler
   */
  if (selection == null) return false

  /**
   * If the selection is expanded, use the default handler
   */
  if (Range.isExpanded(selection)) return false

  /**
   * The anchor and the focus are the same
   */
  const { anchor: cursor } = selection

  /**
   * In a code-line, when we insert a break, make sure to keep the indent
   * the same
   */
  if (insertBreakInCodeLine(editor, originalInsertBreak)) return true

  /**
   * In a table use newlines.
   */
  if (insertBreakInTd(editor)) return true

  /**
   * Special handling for lists
   */
  if (insertBreakInListItem(editor, originalInsertBreak)) return true

  /**
   * Special handling for inserting a break at the end of a convertible.
   *
   * Should turn the convertible into a paragraph.
   */
  if (insertBreakInConvertible(editor, originalInsertBreak, cursor)) return true

  return false
}

export function withInsertBreak(editor: Editor): Editor {
  /**
   * Handle breaks in tables as newlines and also special handling when inserting
   * breaks at end of line.
   */
  const originalInsertBreak = editor.insertBreak
  editor.insertBreak = () => {
    if (insertBreak(editor, originalInsertBreak)) return
    originalInsertBreak()
  }
  return editor
}
