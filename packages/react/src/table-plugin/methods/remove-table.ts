import { Editor, Transforms } from "slate"

export function removeTable(editor: Editor): boolean {
  const t = editor.tablePlugin.getTableInfo()
  if (t === undefined) return false
  Transforms.removeNodes(editor, { at: t.tablePath })
  return true
}
