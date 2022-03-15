import { Editor, Transforms } from "slate"
import { getTableInfo } from "./table-info"
import { Table } from "."

/**
 * Tab forward in a table.
 *
 * Create a new row if needed.
 */

export function tabForward(editor: Editor) {
  const { tdIndex, tdCount, trIndex, trCount, tablePath } = getTableInfo(editor)
  /**
   * Increment column
   */
  let nextTdIndex = tdIndex + 1
  let nextTrIndex = trIndex
  /**
   * If we're past the last column, go to the first cell in the next row
   */
  if (nextTdIndex >= tdCount) {
    nextTdIndex = 0
    nextTrIndex++
    /**
     * If we're past the last row, insert a new one
     */
    if (nextTrIndex >= trCount) {
      Table.insertRow(editor, 1)
    }
  }
  Transforms.select(
    editor,
    Editor.start(editor, [...tablePath, nextTrIndex, nextTdIndex])
  )
}

/**
 * Tab backward in a table
 */

export function tabBackward(editor: Editor) {
  const { tdIndex, tdCount, trIndex, tablePath } = getTableInfo(editor)
  let nextTdIndex = tdIndex - 1
  let nextTrIndex = trIndex
  /**
   * What happens if we tab backward past the first column
   */
  if (nextTdIndex < 0) {
    /**
     * If we're in the first row, do nothing. Just leave the cursor where it is.
     */
    if (nextTrIndex === 0) return
    nextTdIndex = tdCount - 1
    nextTrIndex--
  }
  Transforms.select(
    editor,
    Editor.start(editor, [...tablePath, nextTrIndex, nextTdIndex])
  )
}
