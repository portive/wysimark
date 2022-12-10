import { Editor, Location, Transforms } from "slate"

import { getTableInfo } from "./get-table-info"
import { removeTable } from "./remove-table"

export function removeRow(
  editor: Editor,
  { at = editor.selection }: { at?: Location | null } = {}
) {
  const t = getTableInfo(editor, { at })
  if (t === undefined) return false
  if (t.rowCount === 1) {
    removeTable(editor)
    return true
  }
  Editor.withoutNormalizing(editor, () => {
    Transforms.removeNodes(editor, { at: t.rowPath })
    Transforms.select(
      editor,
      Editor.start(editor, [
        ...t.tablePath,
        Math.min(t.rowIndex, t.rowCount - 2),
        t.cellIndex,
      ])
    )
  })
  return true
}
