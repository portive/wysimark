import { Editor, Path } from "slate"
import { TableElement } from "../../types"
import { removeElementIfEmpty, removeInvalidChildren } from "../util"

/**
 * Normalize the various parts of the table
 */

export function normalizeTable(
  editor: Editor,
  table: TableElement,
  path: Path
) {
  /**
   * Normalize invalid parent: n/a
   */
  /**
   * Normalize empty children
   */
  if (removeElementIfEmpty(editor, table, path)) return true
  /**
   * Normalize invalid children
   */
  if (removeInvalidChildren(editor, path, ["tr"])) return true
  /**
   * Normalize props
   *
   * `columns` are normalized to cell count in `tr` normalizer
   */
  return false
}
