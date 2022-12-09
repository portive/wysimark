import { Editor, Path } from "slate"

import { selectStartOfElement } from "~/src/sink"

import { getTableInfo } from "./get-table-info"

export function down(editor: Editor): boolean {
  const t = getTableInfo(editor)
  if (!t) return false
  const { cellIndex, rowIndex, rowCount, tablePath } = t
  if (rowIndex < rowCount - 1) {
    selectStartOfElement(editor, [...tablePath, rowIndex + 1, cellIndex])
    return true
  }
  try {
    selectStartOfElement(editor, Path.next(tablePath))
    return true
  } catch (e) {
    return false
  }
}

export function up(editor: Editor): boolean {
  const t = getTableInfo(editor)
  if (!t) return false
  const { cellIndex, rowIndex, tablePath } = t
  if (rowIndex > 0) {
    selectStartOfElement(editor, [...tablePath, rowIndex - 1, cellIndex])
    return true
  }
  try {
    selectStartOfElement(editor, Path.previous(tablePath))
    return true
  } catch (e) {
    return false
  }
}
