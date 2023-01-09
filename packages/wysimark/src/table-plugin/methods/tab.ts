import { Editor } from "slate"

import { selectStartOfElement } from "~/src/sink"

import { getTableInfo } from "./get-table-info"
import { insertRowBelow } from "./insert-row"
export function tabForward(editor: Editor) {
  const t = getTableInfo(editor)
  if (!t) return false

  const { cellIndex, cellCount, rowIndex, rowCount, tablePath } = t

  /**
   * If we aren't in the last cell of the row, then select the next cell
   */
  if (cellIndex < cellCount - 1) {
    selectStartOfElement(editor, [...tablePath, rowIndex, cellIndex + 1])
    return true
  }

  /**
   * If we are in the last cell of the row but we aren't in the last row of
   * the table, then select the first cell in the next row.
   */
  if (rowIndex < rowCount - 1) {
    selectStartOfElement(editor, [...tablePath, rowIndex + 1, 0])
    return true
  }

  /**
   * If we are in the last cell of the table, insert a new row and then
   * select the first cell in the new row.
   */
  insertRowBelow(editor)
  selectStartOfElement(editor, [...tablePath, rowIndex + 1, 0])

  return true
}

export function tabBackward(editor: Editor) {
  const t = getTableInfo(editor)
  if (!t) return false

  const { cellIndex, cellCount, rowIndex, tablePath } = t

  if (cellIndex > 0) {
    selectStartOfElement(editor, [...tablePath, rowIndex, cellIndex - 1])
    return true
  }

  if (rowIndex > 0) {
    selectStartOfElement(editor, [...tablePath, rowIndex - 1, cellCount - 1])
    return true
  }
}
