import { Editor, Path } from "slate"
import { ReactEditor } from "slate-react"

import { selectStartOfElement } from "~/src/sink"

import { getTableInfo, TableInfo } from "./get-table-info"

/**
 * This is named with `...Unreliable...` because at the beginning of a line
 * (e.g. the second line of a paragraph) the DOMRect returned will be for a
 * position at the end of the previous line.
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
function getUnreliableSelectionRect(): DOMRect | null {
  const s = window.getSelection()
  if (!s) return null
  const range = s.getRangeAt(0)
  return range.getBoundingClientRect()
}

/**
 * arrow down
 */
export function down(editor: Editor): boolean {
  const t = getTableInfo(editor)
  if (!t) return false
  const selectionRect = getUnreliableSelectionRect()
  if (!selectionRect) return true
  const cellNode = ReactEditor.toDOMNode(editor, t.cellElement)
  const cellRect = cellNode.getBoundingClientRect()
  const paragraphNode = ReactEditor.toDOMNode(
    editor,
    t.cellElement.children[t.cellElement.children.length - 1]
  )
  if (!paragraphNode) return true
  const paragraphStyle = getComputedStyle(paragraphNode)
  const paragraphRect = paragraphNode.getBoundingClientRect()
  const isInLastLine =
    selectionRect.bottom >
    paragraphRect.bottom - parseFloat(paragraphStyle.paddingBottom) - 16
  if (!isInLastLine) {
    setTimeout(() => {
      const selectionRect = getUnreliableSelectionRect()
      if (!selectionRect) return
      if (
        selectionRect.left > cellRect.right ||
        selectionRect.right < cellRect.left
      ) {
        selectCellBelow(editor, t)
      }
    })
    return false
  }
  return selectCellBelow(editor, t)
}

function selectCellBelow(editor: Editor, t: TableInfo) {
  const { cellIndex, rowIndex, rowCount, tablePath } = t
  /**
   * if we aren't in the last row of a table, move down a row
   */
  if (rowIndex < rowCount - 1) {
    selectStartOfElement(editor, [...tablePath, rowIndex + 1, cellIndex])
    return true
  }
  /**
   * If we are in the last row of a table, move to the start of the Element
   * after the table
   */
  try {
    selectStartOfElement(editor, Path.next(tablePath))
    return true
  } catch (e) {
    return false
  }
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
  const { cellIndex, rowIndex, tablePath } = t
  /**
   * If we aren't in the first row of a table, move up a row
   */
  if (rowIndex > 0) {
    selectStartOfElement(editor, [...tablePath, rowIndex - 1, cellIndex])
    return true
  }
  /**
   * If we are in the first row of a table, move to the start of the Element
   * before the table.
   */
  try {
    selectStartOfElement(editor, Path.previous(tablePath))
    return true
  } catch (e) {
    return false
  }
}
