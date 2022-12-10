import { Descendant, Editor, Path } from "slate"
import { ReactEditor } from "slate-react"

import { selectStartOfElement } from "~/src/sink"

import { getTableInfo } from "../get-table-info"
import { selectElementAbove, selectElementBelow } from "./select-element"
import { checkIsInElement, getUnreliableSelectionRect } from "./utils"

function checkIsInLastLine(editor: Editor, element: Descendant) {
  /**
   * Get the unreliable selection rect. If there is no selection, we consider
   * that the selection is not in the last line which will usually indicates
   * default behavior.
   */
  const selectionRect = getUnreliableSelectionRect()
  if (!selectionRect) return false
  const domNode = ReactEditor.toDOMNode(editor, element)
  const domStyle = window.getComputedStyle(domNode)
  const domRect = domNode.getBoundingClientRect()
  return (
    selectionRect.bottom >
    domRect.bottom -
      parseFloat(domStyle.paddingBottom) -
      parseFloat(domStyle.borderBottom) -
      /**
       * This number is a fudge factor but probably works okay as long as the
       * line height doesn't fall below 8px in which case it might capture
       * two lines. This could be improved by figuring out the line height
       * but not sure if it's work the complexity when it will probably always
       * work.
       */
      16
  )
}

/**
 * arrow down
 */
export function down(editor: Editor): boolean {
  const t = getTableInfo(editor)
  if (!t) return false
  // const selectionRect = getUnreliableSelectionRect()
  // if (!selectionRect) return true
  // const isInLastLine = checkIsInLastLine(
  //   editor,
  //   t.cellElement.children[t.cellElement.children.length - 1]
  // )
  // if (!isInLastLine) {
  setTimeout(() => {
    if (!checkIsInElement(editor, t.cellElement)) {
      selectElementBelow(editor, t)
    }
  })
  return false
  // }
  // return selectElementBelow(editor, t)
}

/**
 * arrow up
 */
export function up(editor: Editor): boolean {
  const t = getTableInfo(editor)
  /**
   * exit if we're not in a table
   */
  if (!t) return false
  setTimeout(() => {
    if (!checkIsInElement(editor, t.cellElement)) {
      selectElementAbove(editor, t)
    }
  })
  return false
  // const { cellIndex, rowIndex, tablePath } = t
  // /**
  //  * If we aren't in the first row of a table, move up a row
  //  */
  // if (rowIndex > 0) {
  //   selectStartOfElement(editor, [...tablePath, rowIndex - 1, cellIndex])
  //   return true
  // }
  // /**
  //  * If we are in the first row of a table, move to the start of the Element
  //  * before the table.
  //  */
  // try {
  //   selectStartOfElement(editor, Path.previous(tablePath))
  //   return true
  // } catch (e) {
  //   return false
  // }
}
