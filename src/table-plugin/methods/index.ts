import { Editor } from "slate"

import { curry, selectStartOfElement } from "~/src/sink"

import { getTableInfo } from "./get-table-info"
import { insertRowAbove, insertRowAt, insertRowBelow } from "./insert-row"
import { removeRow } from "./remove-row"
import { removeTable } from "./remove-table"
import { tabBackward, tabForward } from "./tab"

export function down(editor: Editor) {
  const t = getTableInfo(editor)
  if (!t) return false
  const { cellIndex, rowIndex, rowCount, tablePath } = t
  if (rowIndex < rowCount - 1) {
    selectStartOfElement(editor, [...tablePath, rowIndex + 1, cellIndex])
  }
}

export function up(editor: Editor) {
  const t = getTableInfo(editor)
  if (!t) return false
  const { cellIndex, rowIndex, tablePath } = t
  if (rowIndex > 0) {
    selectStartOfElement(editor, [...tablePath, rowIndex - 1, cellIndex])
  }
}

export function createTableMethods(editor: Editor) {
  return {
    getTableInfo: curry(getTableInfo, editor),
    insertRowAt: curry(insertRowAt, editor),
    insertRowAbove: curry(insertRowAbove, editor),
    insertRowBelow: curry(insertRowBelow, editor),
    removeTable: curry(removeTable, editor),
    removeRow: curry(removeRow, editor),
    tabForward: curry(tabForward, editor),
    tabBackward: curry(tabBackward, editor),
    down: curry(down, editor),
    up: curry(up, editor),
  }
}
