import isEqual from "lodash/isEqual"
import range from "lodash/range"
import { Editor, Element, Path, Point, Range, Text, Transforms } from "slate"
import * as Custom from "../custom"
import {
  TableColumn,
  TableColumnAlign,
  TableElement,
  TdElement,
  TrElement,
} from "../types"
import { isFocusInside } from "../utils"
import { getMatch, getTableInfo } from "./table-info"
export * from "./tab"
export * from "./up-down"
export { getTableInfo } from "./table-info"

/**
 * Simplifies creating an empty `td` element
 */

export function createTd(
  index: number,
  stringOrLeaf: string | Text = ""
): TdElement {
  const leaf =
    typeof stringOrLeaf === "string" ? { text: stringOrLeaf } : stringOrLeaf
  return {
    type: "td",
    index,
    children: [{ type: "p", children: [leaf] }],
  }
}

/**
 * Simplifies creating an empty `tr` element
 *
 * Note:
 * We take either a `number` or `TableColumn[]` but eventually, we'll want to
 * take only `TableColumn[]` because instead of an `index` we are eventually
 * going to want to have an `id` of some sort. Probably a `nanoid`.
 *
 * This is because it will play nicer once we have collaborative editing working
 * where we can uniquely identify each column.
 */

export function createEmptyTr(columnDefs: TableColumn[] | number): TrElement {
  const columns: TableColumn[] =
    typeof columnDefs === "number"
      ? range(columnDefs).map(() => ({ align: "left" }))
      : columnDefs
  return {
    type: "tr",
    children: columns.map((_, index) => createTd(index)),
  }
}

/**
 * Create a table with the given specifications. The columnDefs can be
 * supplied as a single nuber which results in a that many columns all aligned
 * left or it can be supplied as an array of `Align` to specify the alignment
 * of each column.
 */

export function createTable(
  columnDefs: TableColumn[] | number,
  rowCount: number
): TableElement {
  const columns: TableColumn[] =
    typeof columnDefs === "number"
      ? range(columnDefs).map(() => ({ align: "left" }))
      : columnDefs
  return {
    type: "table",
    columns,
    children: range(rowCount).map(() => createEmptyTr(columns)),
  }
}

/**
 * Reindex Table Cells
 *
 * Each of the cells in a row of a table has an `index` that indicates its
 * position. This is important because when rendering we need to know what
 * `Column` each cell is referring to but the `render` method doesn't know
 * about its current `Path`. Because it doesn't know its path, it can't tell
 * what `Column` it is in.  Adding the `index` property solves this.
 */

function reindexTable(editor: Editor) {
  const { tablePath, trs } = getTableInfo(editor)
  Editor.withoutNormalizing(editor, () => {
    trs.forEach((tr, trIndex) => {
      tr.children.forEach((td, tdIndex) => {
        if (tdIndex !== td.index) {
          const tdPath = [...tablePath, trIndex, tdIndex]
          Transforms.setNodes(editor, { index: tdIndex }, { at: tdPath })
        }
      })
    })
  })
}

/**
 * Is the current selection inside a table?
 */

function isInside(editor: Editor) {
  return isFocusInside(editor, "td")
}

/**
 * Insert a column in table
 *
 * Make sure to create the `table.align` values and to reindex `td.index`
 */

function insertColumn(editor: Editor, offset: 0 | 1) {
  Editor.withoutNormalizing(editor, () => {
    const { tdIndex, table, tablePath } = getTableInfo(editor)

    // Set the new `align` value based on the current `td` column (not the position
    // to insert at)
    const columns = table.columns.slice()
    columns.splice(tdIndex, 0, table.columns[tdIndex])
    Transforms.setNodes(editor, { columns }, { at: tablePath })

    // Insert the `td` in every row
    const insertTdIndex = tdIndex + offset
    table.children.forEach((tr, trIndex) => {
      const at = tablePath.concat([trIndex, insertTdIndex])
      Transforms.insertNodes(editor, createTd(tdIndex), { at })
    })
    reindexTable(editor)
  })
}

/**
 * Insert row in table
 */

function insertRow(editor: Editor, offset: 0 | 1) {
  const { table, trPath } = getTableInfo(editor)
  const trToInsert = createEmptyTr(table.columns)
  const at = trPath.slice(0, -1).concat([trPath[trPath.length - 1] + offset])
  Transforms.insertNodes(editor, trToInsert, { at })
}

/**
 * Remove table
 */

function removeTable(editor: Editor) {
  const { tablePath } = getTableInfo(editor)
  Transforms.removeNodes(editor, { at: tablePath })
}

/**
 * Remove row in table
 */

function removeRow(editor: Editor) {
  const { tablePath, tdIndex, trPath, trIndex, trCount } = getTableInfo(editor)
  if (trCount === 1) {
    return removeTable(editor)
  }
  Editor.withoutNormalizing(editor, () => {
    Transforms.removeNodes(editor, { at: trPath })
    Transforms.select(
      editor,
      Editor.start(editor, [
        ...tablePath,
        Math.min(trIndex, trCount - 2),
        tdIndex,
      ])
    )
  })
}

/**
 * Remove column in table
 */

function removeColumn(editor: Editor) {
  const { table, tablePath, tdIndex, tdCount, trIndex, trs } =
    getTableInfo(editor)
  if (tdCount === 1) {
    return removeTable(editor)
  }
  Editor.withoutNormalizing(editor, () => {
    // Set the new `align` value based on the current `td` column (not the position
    // to insert at)
    const columns = table.columns.slice()
    columns.splice(tdIndex, 1)
    Transforms.setNodes(editor, { columns }, { at: tablePath })
    trs.forEach((tr, trIndex) => {
      Transforms.removeNodes(editor, { at: [...tablePath, trIndex, tdIndex] })
    })
    reindexTable(editor)
    const selection = Editor.start(editor, [
      ...tablePath,
      trIndex,
      Math.min(tdIndex, tdCount - 2),
    ])
    Transforms.select(editor, selection)
  })
}

/**
 * Remove a character from a backspace or forward delete.
 *
 * Takes an `isIgnore` function.
 */

function shouldIgnoreRemove(
  editor: Editor,
  isIgnore: (editor: Editor, point: Point, tdPath: Path) => boolean
) {
  const { selection } = editor
  if (selection == null) return false
  if (Range.isExpanded(selection)) return false
  const { anchor } = selection
  const [, tdPath] = getMatch(editor, "td", selection)
  const ignore = isIgnore(editor, anchor, tdPath)
  if (ignore) {
    return true
  } else {
    return false
  }
}

/**
 * Handle backspace
 */

function shouldIgnoreBackspace(editor: Editor) {
  return shouldIgnoreRemove(editor, Editor.isStart)
}

/**
 * Handle forward delete
 */

function shouldIgnoreDelete(editor: Editor) {
  return shouldIgnoreRemove(editor, Editor.isEnd)
}

/**
 * This should be checked everywhere, not just within the table like the other
 * ignore functions. We want to check if either the anchor or focus are in a
 * table and ignore the remove if either end is in a `td` and the other end is
 * not in the same `td`.
 *
 * This is not great because it just cancels the delete, but for now it is
 * better than leaving the table in an inconsistent state.
 */
function shouldIgnoreRemoveGlobal(editor: Editor) {
  const { selection } = editor
  if (selection == null) return false
  if (Range.isCollapsed(selection)) return false
  const { anchor, focus } = selection
  const anchorMatch = Editor.above(editor, {
    at: anchor,
    match: (n) => Element.isElement(n) && n.type === "td",
  })
  const focusMatch = Editor.above(editor, {
    at: focus,
    match: (n) => Element.isElement(n) && n.type === "td",
  })
  /**
   * If the anchor and focus is not in a table, let the remove happen
   */
  if (!anchorMatch && !focusMatch) return false
  /**
   * If one of the anchor or the focus is in a table, prevent the remove
   * because you are deleting part of a table
   */
  if (!anchorMatch || !focusMatch) return true
  /**
   * If the anchor and focus are in the same cell, let the remove happen
   */
  if (isEqual(anchorMatch[1], focusMatch[1])) return false
  return true
}

/**
 * Put the selection anywhere in a table and then
 */
function setColumnAlign(editor: Editor, alignToSet: TableColumnAlign) {
  if (!isInside(editor)) return
  const tableInfo = getTableInfo(editor)
  const { table, tablePath, tdIndex } = tableInfo
  const columns = [...table.columns]
  columns[tdIndex] = { align: alignToSet }
  Transforms.setNodes(editor, { columns }, { at: tablePath })
}

/**
 * Insert table
 */
function insertTable(
  editor: Editor,
  { rowCount, colCount }: { rowCount: number; colCount: number }
) {
  const tableNode = createTable(colCount, rowCount)
  Custom.insertNestedBlock(editor, tableNode)
}

/**
 * Table
 */

export const Table = {
  getTableInfo,
  createTable,
  insertColumn,
  insertRow,
  insertTable,
  isInside,
  removeColumn,
  removeRow,
  removeTable,
  setColumnAlign,
  shouldIgnoreBackspace,
  shouldIgnoreDelete,
  shouldIgnoreRemoveGlobal,
}
