import { Editor, Transforms } from "slate"

import { BetterAt } from "~/src/sink"

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
 * Used internally for `insertRowAbove` and `insertRowBelow` to do an insert
 * with an offset to improve code reused.
 */
export function insertRow(
  editor: Editor,
  { at = editor.selection, offset = 0 }: { at?: BetterAt; offset?: 0 | 1 } = {}
): boolean {
  const t = getTableInfo(editor, { at })
  if (!t) return false
  const nextRowElement = createRow(t.tableElement.columns.length)
  Transforms.insertNodes(editor, nextRowElement, {
    at: [...t.tablePath, t.rowIndex + offset],
  })
  return true
}

/**
 * Insert row above current selection
 */
export function insertRowAbove(
  editor: Editor,
  { at }: { at?: BetterAt } = {}
): boolean {
  return insertRow(editor, { at })
}

/**
 * Insert row below current selection
 */
export function insertRowBelow(
  editor: Editor,
  { at }: { at?: BetterAt } = {}
): boolean {
  return insertRow(editor, { at, offset: 1 })
}
