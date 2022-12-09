import { Descendant, Editor, Transforms } from "slate"

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

export function insertRow(editor: Editor, offset: 0 | 1): boolean {
  const t = getTableInfo(editor)
  if (!t) return false
  const { tableElement, tablePath, rowIndex } = t
  const nextRowElement = createRow(tableElement.columns.length)
  const nextRowIndex = rowIndex + offset
  const at = [...tablePath, nextRowIndex]
  Transforms.insertNodes(editor, nextRowElement, { at })
  return true
}
