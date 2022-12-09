import { table } from "console"
import { Editor, Path, Transforms } from "slate"

import { TableRowElement } from "../types"
import { getTableInfo } from "./get-table-info"
import { createCell } from "./utils"

export function insertColumnOffset(editor: Editor, offset: 0 | 1): boolean {
  const t = getTableInfo(editor)
  if (t === undefined) return false
  const { tableElement, tablePath, cellIndex } = t
  const nextCellIndex = cellIndex + offset
  Editor.withoutNormalizing(editor, () => {
    const columns = tableElement.columns
    const nextColumns = [...columns]
    nextColumns.splice(nextCellIndex, 0, columns[nextCellIndex])
    Transforms.setNodes(editor, { columns: nextColumns }, { at: tablePath })
    tableElement.children.forEach((rowElement, i) => {
      Transforms.insertNodes(editor, createCell(nextCellIndex), {
        at: [...tablePath, i, nextCellIndex],
      })
    })
  })
  return true
}

export function insertColumnLeft(editor: Editor) {
  return insertColumnOffset(editor, 0)
}

export function insertColumnRight(editor: Editor) {
  return insertColumnOffset(editor, 1)
}
