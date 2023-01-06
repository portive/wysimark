import { Editor } from "slate"

import { curryOne } from "~/src/sink"

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
    down: curryOne(down, editor),
    up: curryOne(up, editor),
  }
}
