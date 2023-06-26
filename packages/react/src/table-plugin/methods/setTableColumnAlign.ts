import { Editor, Transforms } from "slate"

import { getTableInfo } from "./get-table-info"

export function setTableColumnAlign(
  editor: Editor,
  options: { align: "left" | "center" | "right" }
) {
  const t = getTableInfo(editor)
  if (t === undefined) return false
  const { tableElement, tablePath, cellIndex } = t
  const nextColumns = tableElement.columns.slice()
  nextColumns.splice(cellIndex, 1, { align: options.align })
  Transforms.setNodes(editor, { columns: nextColumns }, { at: tablePath })
  return true
}
