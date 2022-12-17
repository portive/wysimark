import { Editor, Element, Location, Path, Transforms } from "slate"

import { BetterAt, findElementUp } from "~/src/sink"

import { TableColumn, TableElement, TableRowElement } from "../types"
import { createCell } from "./utils"

function createRange(size: number): number[] {
  return [...Array(size).keys()]
}

function createColumns(columnCount: number): TableColumn[] {
  return createRange(columnCount).map(() => ({ align: "left" }))
}

function createTable(columnCount: number, rowCount: number): TableElement {
  return {
    type: "table",
    columns: createColumns(columnCount),
    children: createRange(rowCount).map(() => createRow(columnCount)),
  }
}

function createRow(columnCount: number): TableRowElement {
  return {
    type: "table-row",
    children: [...Array(columnCount).keys()].map((index) => createCell(index)),
  }
}

/**
 * Used internally for `insertRowAbove` and `insertRowBelow` to do an insert
 * with an offset to improve code reused.
 */
export function insertTable(
  editor: Editor,
  columnCount: number,
  rowCount: number,
  { at = editor.selection }: { at?: Location | null } = {}
): boolean {
  const table = createTable(columnCount, rowCount)
  return insertRootElement(editor, table, { at })
}

export function insertRootElement(
  editor: Editor,
  element: Element,
  { at = editor.selection }: { at?: Location | null } = {}
) {
  if (at == null) return false
  const entry = findElementUp(
    editor,
    (node) => Element.isElement(node) && editor.isMaster(node)
  )
  if (entry == null) {
    const selection = editor.selection
    Editor.withoutNormalizing(editor, () => {
      Transforms.insertNodes(editor, element, { at })
      if (selection) {
        Transforms.select(editor, selection)
        Transforms.move(editor)
      }
    })
  } else {
    const nextPath = Path.next(entry[1])
    Editor.withoutNormalizing(editor, () => {
      Transforms.insertNodes(editor, element, { at: nextPath })
      Transforms.select(editor, Editor.start(editor, nextPath))
    })
  }
  return true
}
