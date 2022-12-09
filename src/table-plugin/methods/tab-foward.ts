import { Editor, Path, Transforms } from "slate"

import { selectStartOfElement } from "~/src/sink"

import { getTableInfo } from "./get-table-info"
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
