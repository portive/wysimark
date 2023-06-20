import { Editor, Transforms } from "slate"

import { BetterAt, curryOne } from "~/src/sink"

import { getTableInfo } from "./get-table-info"
import { insertColumn } from "./insert-column"
import { insertRow } from "./insert-row"
import { insertTable } from "./insert-table"
import { down, up } from "./navigation"
import { removeColumn } from "./remove-column"
import { removeRow } from "./remove-row"
import { removeTable } from "./remove-table"
import { tabBackward, tabForward } from "./tab"

export function createTableMethods(editor: Editor) {
  return {
    getTableInfo: curryOne(getTableInfo, editor),
    insertTable: curryOne(insertTable, editor),
    insertColumn: curryOne(insertColumn, editor),
    insertRow: curryOne(insertRow, editor),
    removeTable: curryOne(removeTable, editor),
    removeColumn: curryOne(removeColumn, editor),
    removeRow: curryOne(removeRow, editor),
    tabForward: curryOne(tabForward, editor),
    tabBackward: curryOne(tabBackward, editor),
    selectCell: curryOne(selectCell, editor),
    down: curryOne(down, editor),
    up: curryOne(up, editor),
  }
}

function selectCell(
  editor: Editor,
  { at = editor.selection }: { at?: BetterAt } = {}
) {
  const t = getTableInfo(editor, { at })
  if (t === undefined) return false
  const { cellPath } = t
  Transforms.select(editor, cellPath)
  return true
}
