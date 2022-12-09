import { Descendant, Editor, Node, Transforms } from "slate"

import { TableCellElement, TableColumn, TableRowElement } from "./element-types"
import { getTableInfo } from "./table-info"

export function createCell(
  index: number,
  children: Descendant[] = [{ type: "paragraph", children: [{ text: "" }] }]
): TableCellElement {
  return {
    type: "table-cell",
    index,
    children,
  }
}

export function createRow(columnCount: number): TableRowElement {
  return {
    type: "table-row",
    children: [...Array(columnCount).keys()].map((index) => createCell(index)),
  }
}

export function createTableMethods(editor: Editor) {
  function insertRow(offset: 0 | 1): boolean {
    const tableInfo = getTableInfo(editor)
    if (tableInfo === undefined) return false
    const { tableElement, tablePath, rowIndex } = tableInfo
    const nextRowElement = createRow(tableElement.columns.length)
    const nextRowIndex = rowIndex + offset
    const at = [...tablePath, nextRowIndex]
    Transforms.insertNodes(editor, nextRowElement, { at })
    return true
  }

  function removeTable() {
    const t = getTableInfo(editor)
    if (t === undefined) return false
    Transforms.removeNodes(editor, { at: t.tablePath })
    return true
  }

  function removeRow() {
    const t = getTableInfo(editor)
    if (t === undefined) return false
    if (t.rowCount === 1) {
      removeTable()
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

  return {
    insertRow,
    removeTable,
    removeRow,
  }
}
