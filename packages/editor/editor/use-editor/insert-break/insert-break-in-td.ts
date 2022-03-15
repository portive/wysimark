import { Editor } from "slate"
import { isFocusInside } from "~/editor/utils"
import { insertNewline } from "../../custom"

/**
 * If the selection is collapsed and in a table, insert a newline instead of
 * using the default of splitting the block.
 */
export function insertBreakInTd(editor: Editor): boolean {
  if (!isFocusInside(editor, "td")) return false
  insertNewline(editor)
  return true
}
