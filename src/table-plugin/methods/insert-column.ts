import { Editor, Transforms } from "slate"

import { MatchAt } from "~/src/sink"

import { getTableInfo } from "./get-table-info"
import { createCell } from "./utils"

export function insertColumnOffset(
  editor: Editor,
  { offset = 0, at = editor.selection }: { offset?: 0 | 1; at?: MatchAt } = {}
): boolean {
  const t = getTableInfo(editor, { at })
  if (t === undefined) return false
  const { tableElement, tablePath, cellIndex } = t
  const nextCellIndex = cellIndex + offset
  Editor.withoutNormalizing(editor, () => {
    const { columns } = tableElement
    const nextColumns = [...columns]
    /**
     * Insert a Column into `TableElement.columns` which is the same as the
     * value of the current column. This is the `alignment` of the column.
     */
    nextColumns.splice(nextCellIndex, 0, columns[nextCellIndex])
    Transforms.setNodes(editor, { columns: nextColumns }, { at: tablePath })

    /**
     * Insert a `TableCell` at the correct spot.
     */
    tableElement.children.forEach((rowElement, i) => {
      Transforms.insertNodes(editor, createCell(nextCellIndex), {
        at: [...tablePath, i, nextCellIndex],
      })
    })
  })
  return true
}

export function insertColumnLeft(
  editor: Editor,
  { at }: { at?: MatchAt } = {}
) {
  return insertColumnOffset(editor, { at })
}

export function insertColumnRight(
  editor: Editor,
  { at }: { at?: MatchAt } = {}
) {
  return insertColumnOffset(editor, { at, offset: 1 })
}
