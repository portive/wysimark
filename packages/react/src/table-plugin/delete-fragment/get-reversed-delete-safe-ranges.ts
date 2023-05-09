import { BasePoint, Editor, Path, Range } from "slate"

import { findElementUpPath } from "~/src/sink"

export function getReversedDeleteSafeRanges(
  editor: Editor,
  deleteRange: Range,
  protectedTypes: string[]
): Range[] {
  /**
   * Editor.positions returns a bunch of positions which essentially represent
   * the start and end of Nodes with the exception of the start of the passed
   * in Range and the end of the passed in Range.
   */
  const positions = [...Editor.positions(editor, { at: deleteRange })]

  /**
   * We create our own set of deleteSafeRanges here
   */
  const deleteSafeRanges: Range[] = []

  let startPos: BasePoint, prevPos: BasePoint, startTdPath: Path | undefined
  startPos = prevPos = positions[0]
  startTdPath = findElementUpPath(editor, protectedTypes, {
    at: startPos,
  })

  for (const pos of positions) {
    const tdPath = findElementUpPath(editor, protectedTypes, {
      at: pos,
    })
    /**
     * What we're looking for is that if we search for a protectedType from
     * this point, and the protectedType is the same as the prvious point we
     * looked at, then keep going.
     *
     * We keep track of the `prevPos` though because when we are in a different
     * protectedType (or switch to not being in one) then we need the `prevPos`
     */
    if (
      (startTdPath && tdPath && Path.equals(startTdPath, tdPath)) ||
      (startTdPath == undefined && tdPath == undefined)
    ) {
      prevPos = pos
    } else {
      /**
       * Once we see a difference (i.e. a new protectedType or we switch to
       * being or not being in a protectedType) then we create a Range and
       * add it to `deleteSafeRanges`.
       *
       * We also reset some of our variables that we are tracking.
       */
      const range = { anchor: startPos, focus: prevPos }
      deleteSafeRanges.push(range)
      startPos = prevPos = pos
      startTdPath = tdPath
    }
  }
  const range = { anchor: startPos, focus: prevPos }
  deleteSafeRanges.push(range)
  deleteSafeRanges.reverse()
  return deleteSafeRanges
}
