import { Editor, Location, Path } from "slate"
import { Narrow } from "~/lib/ts-utils"
import {
  CustomElement,
  IsElementByType,
  TableElement,
  TdElement,
  TrElement,
} from "../types"

/**
 * Looks for the nearest ancestor that matches the given type.
 *
 * returns a tuple with `[element, path, lastIndex]`
 */

export function getMatch<T extends CustomElement["type"]>(
  editor: Editor,
  type: T,
  at: Location
) {
  const match = Editor.above(editor, {
    at,
    // at: editor.selection!.focus,
    match: IsElementByType(type),
  })
  if (match == null) throw new Error(`Could not find node of type ${type}`)
  const [el, path] = match
  return [
    el as Narrow<CustomElement, { type: T }>,
    path,
    path[path.length - 1],
  ] as const
}

/**
 * The TableInfo object that includes everything you need to know about a
 * specific table.
 */
export type TableInfo = {
  td: TdElement
  tdPath: Path
  tdIndex: number
  tdCount: number
  tr: TrElement
  trPath: Path
  trIndex: number
  trCount: number
  trs: TrElement[]
  table: TableElement
  tablePath: Path
  tableIndex: number
}

/**
 * get table info
 */

export function getTableInfo(
  editor: Editor,
  at: Location | null = editor.selection
): TableInfo {
  if (at == null)
    throw new Error(`Expected at or editor.selection to have a value`)
  const start = Editor.start(editor, at)
  const [td, tdPath, tdIndex] = getMatch(editor, "td", start)
  const [tr, trPath, trIndex] = getMatch(editor, "tr", start)
  const [table, tablePath, tableIndex] = getMatch(editor, "table", start)
  const trs = table.children
  const trCount = trs.length
  const tdCount = tr.children.length
  return {
    td,
    tdPath,
    tdIndex,
    tdCount,
    tr,
    trPath,
    trIndex,
    trCount,
    trs,
    table: table,
    tablePath,
    tableIndex,
  }
}
