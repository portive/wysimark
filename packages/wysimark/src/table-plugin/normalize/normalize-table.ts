import { Editor, NodeEntry, Transforms } from "slate"

import { TableElement } from "../types"

export function normalizeTableIndexes(
  editor: Editor,
  entry: NodeEntry<TableElement>
): boolean {
  let isTransformed = false
  const rowElements = entry[0].children
  rowElements.forEach((rowElement, y) => {
    const cellElements = rowElement.children
    cellElements.forEach((cellElement, x) => {
      if (cellElement.x !== x || cellElement.y !== y) {
        Transforms.setNodes(editor, { x, y }, { at: [...entry[1], y, x] })
        isTransformed = true
      }
    })
  })
  return isTransformed
}
