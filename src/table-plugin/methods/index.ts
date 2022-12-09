import { Editor, Path, Transforms } from "slate"

import { curry, selectStartOfElement } from "~/src/sink"

import { getTableInfo } from "./get-table-info"
import { insertRow } from "./insert-row"
import { removeRow } from "./remove-row"
import { removeTable } from "./remove-table"

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

export function createTableMethods(editor: Editor) {
  return {
    getTableInfo: curry(getTableInfo, editor),
    insertRow: curry(insertRow, editor),
    removeTable: curry(removeTable, editor),
    removeRow: curry(removeRow, editor),
    tabForward: curry(tabForward, editor),
    tabBackward: curry(tabBackward, editor),
  }
}
