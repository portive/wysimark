import { Editor, Path, Transforms } from "slate"

import { TableRowElement } from "../types"
import { getTableInfo } from "./get-table-info"
import { createCell } from "./utils"

function createRow(columnCount: number): TableRowElement {
  return {
    type: "table-row",
    children: [...Array(columnCount).keys()].map((index) => createCell(index)),
  }
}

/**
 * Insert a row in the table at the given path with the given number of columns.
 *
 * TODO:
 *
 * I think we need to remove the `columns` argument. The method should know
 * how many columns are needed.
 */
export function insertRowAt(
  editor: Editor,
  at: Path,
  columns: number
): boolean {
  const nextRowElement = createRow(columns)
  Transforms.insertNodes(editor, nextRowElement, { at })
  return true
}

/**
 * Used internally for `insertRowAbove` and `insertRowBelow` to do an insert
 * with an offset to improve code reused.
 */
function insertRowOffset(editor: Editor, offset: 0 | 1): boolean {
  const t = getTableInfo(editor)
  if (!t) return false
  insertRowAt(
    editor,
    [...t.tablePath, t.rowIndex + offset],
    t.tableElement.columns.length
  )
  return true
}

/**
 * Insert row above current selection
 */
export function insertRowAbove(editor: Editor): boolean {
  return insertRowOffset(editor, 0)
}

/**
 * Insert row below current selection
 */
export function insertRowBelow(editor: Editor): boolean {
  return insertRowOffset(editor, 1)
}
