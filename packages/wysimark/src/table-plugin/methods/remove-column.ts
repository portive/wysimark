import { Editor, Transforms } from "slate"

import { BetterAt } from "~/src/sink"

import { getTableInfo } from "./get-table-info"
import { removeTable } from "./remove-table"

export function removeColumn(
  editor: Editor,
  { at = editor.selection }: { at?: BetterAt } = {}
) {
  const t = getTableInfo(editor, { at })
  if (!t) return false

  const { tableElement, tablePath, rowIndex, cellIndex, cellCount } = t
  if (cellCount === 1) {
    return removeTable(editor)
  }
  Editor.withoutNormalizing(editor, () => {
    // Set the new `align` value based on the current `td` column (not the position
    // to insert at)
    const columns = [...tableElement.columns]
    columns.splice(cellIndex, 1)
    Transforms.setNodes(editor, { columns }, { at: tablePath })
    tableElement.children.forEach((rowElement, rowIndex) => {
      Transforms.removeNodes(editor, {
        at: [...tablePath, rowIndex, cellIndex],
      })
    })
    const selection = Editor.start(editor, [
      ...tablePath,
      rowIndex,
      Math.min(cellIndex, cellCount - 2),
    ])
    Transforms.select(editor, selection)
  })
}
