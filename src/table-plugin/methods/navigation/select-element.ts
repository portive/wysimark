import { Editor, Path } from "slate"

import { selectEndOfElement, selectStartOfElement } from "~/src/sink"

import { TableInfo } from "../get-table-info"

export function selectElementBelow(editor: Editor, t: TableInfo) {
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

export function selectElementAbove(editor: Editor, t: TableInfo) {
  const { cellIndex, rowIndex, tablePath } = t
  /**
   * if we aren't in the first row of a table, move up a row
   */
  if (rowIndex > 0) {
    selectStartOfElement(editor, [...tablePath, rowIndex - 1, cellIndex])
    return true
  }
  /**
   * If we are in the first row of a table, move to the end of the Element
   * before the table
   */
  try {
    selectEndOfElement(editor, Path.previous(tablePath))
    return true
  } catch (e) {
    return false
  }
}
