import { Editor } from "slate"

import { curry } from "~/src/sink"

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
    getTableInfo: curry(getTableInfo, editor),
    insertTable: curry(insertTable, editor),
    insertColumn: curry(insertColumn, editor),
    insertRow: curry(insertRow, editor),
    removeTable: curry(removeTable, editor),
    removeColumn: curry(removeColumn, editor),
    removeRow: curry(removeRow, editor),
    tabForward: curry(tabForward, editor),
    tabBackward: curry(tabBackward, editor),
    down: curry(down, editor),
    up: curry(up, editor),
  }
}
