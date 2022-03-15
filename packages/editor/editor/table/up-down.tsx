import isEqual from "lodash/isEqual"
import { Editor, Transforms } from "slate"
import { TableInfo } from "./table-info"
import { Table } from "."

/**
 * Takes a TableInfo from before and a TableInfo from after and compares them.
 *
 * If they are the same, return true.
 */
function isSameCell(before: TableInfo, after: TableInfo) {
  return isEqual(before.tdPath, after.tdPath)
}

/**
 * returns true if the cursor should be repositioned verticalled compared to
 * the previous position.
 *
 * The logic is:
 *
 * - if the cursor left the table entirely, no need to reposition
 * - If the cursor is in the same cell, no need to reposition
 */
function shouldRepositionVertical(prev: TableInfo, editor: Editor) {
  if (!Table.isInside(editor)) return false
  const after = Table.getTableInfo(editor)
  if (isSameCell(prev, after)) return false
  return true
}

/**
 * Special handling for pressing up in a table. If the cursor escaped the
 * table cell, we want to move the cursor into the cell above.
 *
 * The actual event must not be stopped for this to work
 */
export function delayedUpReposition(editor: Editor) {
  const beforeTable = Table.getTableInfo(editor)
  setTimeout(() => {
    if (!shouldRepositionVertical(beforeTable, editor)) return
    const aboveTrIndex = beforeTable.trIndex - 1
    if (aboveTrIndex < 0) {
      /**
       * Get the point immediately before the table
       */
      const beforePoint = Editor.before(editor, beforeTable.tablePath)
      /**
       * If there's not `beforePoint`, we are at the top of the document.
       * In this scenario, we don't want to end up in a different column so
       * reselect the previous cell.
       */
      if (beforePoint == null) {
        Transforms.select(editor, Editor.start(editor, beforeTable.tdPath))
      } else {
        Transforms.select(editor, beforePoint)
      }
      return
    }
    /**
     * Move the cell in the row above the current one
     */
    Transforms.select(
      editor,
      Editor.start(editor, [
        ...beforeTable.tablePath,
        aboveTrIndex,
        beforeTable.tdIndex,
      ])
    )
  }, 50)
}

/**
 * Special handling for pressing down in a table. If the cursor escaped the
 * table cell, we want to move the cursor into the cell below.
 *
 * The actual event must not be stopped for this to work
 */
export function delayedDownReposition(editor: Editor) {
  const beforeTable = Table.getTableInfo(editor)
  setTimeout(() => {
    if (!shouldRepositionVertical(beforeTable, editor)) return
    const belowTrIndex = beforeTable.trIndex + 1
    /**
     * If we the next row is beyond the table, the cursor moved into an adjacent
     * cell. In this case, we want to move to the start of the element after
     * the table.
     */
    if (belowTrIndex >= beforeTable.trCount) {
      /**
       * Get the point immediately after the table
       */
      const belowPoint = Editor.after(editor, beforeTable.tablePath)
      /**
       * This shouldn't happen as there will always be something underneat
       * if the normalization rules have been followed with a trailing
       * paragraph but it does help narrow the type
       */
      if (belowPoint == null) return
      Transforms.select(editor, belowPoint)
      return
    }
    /**
     * Move to the cell in the row beneath the current one
     */
    Transforms.select(
      editor,
      Editor.start(editor, [
        ...beforeTable.tablePath,
        belowTrIndex,
        beforeTable.tdIndex,
      ])
    )
  }, 50)
}
