import { Editor } from "slate"
import {
  deleteBackwardAroundNested,
  deleteForwardAroundNested,
} from "./delete-across-elements"
import { deleteInCodeLine } from "./delete-in-code-line"
import {
  deleteBackwardInEmptyConvertible,
  deleteForwardInEmptyConvertible,
} from "./delete-in-empty-convertible"
import { deleteBackwardInList } from "./delete-in-list"
import { deleteBackwardInTd, deleteForwardInTd } from "./delete-in-td"

export function withDelete(editor: Editor) {
  /**
   * Ignore deletes at the beginning of a table cell
   */
  const originalDeleteBackward = editor.deleteBackward
  editor.deleteBackward = (unit) => {
    if (deleteInCodeLine(editor)) return
    if (deleteBackwardInTd(editor)) return
    if (deleteBackwardInList(editor)) return
    if (deleteBackwardInEmptyConvertible(editor)) return
    if (deleteBackwardAroundNested(editor)) return
    originalDeleteBackward(unit)
  }

  /**
   * Ignore deletes at the end of a table cell
   */
  const originalDeleteForward = editor.deleteForward
  editor.deleteForward = (unit) => {
    if (deleteInCodeLine(editor)) return
    if (deleteForwardInTd(editor)) return
    if (deleteForwardInEmptyConvertible(editor)) return
    if (deleteForwardAroundNested(editor)) return
    originalDeleteForward(unit)
  }

  return editor
}
