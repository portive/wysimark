import { Descendant, Editor, Path, Transforms } from "slate"

import { TableCellElement, TableRowElement } from "../types"
import { getTableInfo } from "./get-table-info"

export function createCell(
  index: number,
  children: Descendant[] = [{ type: "paragraph", children: [{ text: "" }] }]
): TableCellElement {
  return {
    type: "table-cell",
    index,
    children,
  }
}

export function createRow(columnCount: number): TableRowElement {
  return {
    type: "table-row",
    children: [...Array(columnCount).keys()].map((index) => createCell(index)),
  }
}

export function insertRowAt(
  editor: Editor,
  at: Path,
  columns: number
): boolean {
  const nextRowElement = createRow(columns)
  Transforms.insertNodes(editor, nextRowElement, { at })
  return true
}

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

export function insertRowAbove(editor: Editor): boolean {
  return insertRowOffset(editor, 0)
}

export function insertRowBelow(editor: Editor): boolean {
  return insertRowOffset(editor, 1)
}
