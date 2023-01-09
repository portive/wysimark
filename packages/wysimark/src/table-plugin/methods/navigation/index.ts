import { Editor } from "slate"

import { getTableInfo } from "../get-table-info"
import { selectElementAbove, selectElementBelow } from "./select-element"
import { checkIsInElement } from "./utils"

/**
 * arrow down
 */
export function down(editor: Editor): boolean {
  const t = getTableInfo(editor)
  /**
   * don't handle if we're not in a table
   */
  if (!t) return false
  setTimeout(() => {
    if (!checkIsInElement(editor, t.cellElement)) {
      selectElementBelow(editor, t)
    }
  })
  return false
}

/**
 * arrow up
 */
export function up(editor: Editor): boolean {
  const t = getTableInfo(editor)
  /**
   * don't handle if we're not in a table
   */
  if (!t) return false
  setTimeout(() => {
    if (!checkIsInElement(editor, t.cellElement)) {
      selectElementAbove(editor, t)
    }
  })
  return false
}
