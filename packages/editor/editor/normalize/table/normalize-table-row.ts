import { Editor, Path, Transforms } from "slate"
import { createTd, getTableInfo } from "~/editor/table"
import { TrElement } from "../../types"
import {
  removeElementIfEmpty,
  removeInvalidChildren,
  unwrapOrphanElement,
} from "../util"

/**
 * Remove children that are not `td` elements
 */

export function normalizeTableRow(
  editor: Editor,
  el: TrElement,
  path: Path
): boolean {
  /**
   * Normalize invalid parent
   *
   * Unwrap
   */
  if (unwrapOrphanElement(editor, el, path, "table")) return true
  /**
   * Normalize empty children
   */
  if (removeElementIfEmpty(editor, el, path)) return true
  /**
   * Normalize invalid children
   *
   * Remove them
   */
  if (removeInvalidChildren(editor, path, ["td"])) return true
  /**
   * Normalize props
   *
   * Match number of `td` in `tr` to `table.columns`
   *
   * This only works if there is a `table` parent because if there
   * isn't, the call to `getTableInfo` fails
   */
  if (addAndRemoveCellsInRowToMatchColumns(editor, path)) return true
  return false
}

/**
 * Adds or remove cells in a table row to match the number of `table.columns`
 * which is authoritative.
 */

function addAndRemoveCellsInRowToMatchColumns(
  editor: Editor,
  path: Path
): boolean {
  const { table, trPath, tdCount } = getTableInfo(editor, path)
  const columnCount = table.columns.length
  /**
   * Not enough cells, add more
   */
  if (tdCount < columnCount) {
    Editor.withoutNormalizing(editor, () => {
      for (let i = tdCount; i < columnCount; i++) {
        Transforms.insertNodes(editor, createTd(i), { at: [...trPath, i] })
      }
    })
    return true
  }
  /**
   * Too many cells, remove some
   */
  if (tdCount > columnCount) {
    Editor.withoutNormalizing(editor, () => {
      for (let i = tdCount - 1; i >= columnCount; i--) {
        Transforms.removeNodes(editor, { at: [...trPath, i] })
      }
    })
    return true
  }
  return false
}
