import { MarkKey } from "../../../types"

export function findMarksToRemove(
  orderedMarks: MarkKey[],
  targetMarks: MarkKey[]
): { orderedMarksToRemove: MarkKey[]; nextOrderedMarks: MarkKey[] } {
  /**
   * As a good practice, don't manipulate the incoming argument (even though
   * technically it doesn't matter here)
   */
  const nextOrderedMarks = [...orderedMarks]

  /**
   * Find the marks that we need to remove.
   */
  const marksWeNeedToRemove = orderedMarks.filter(
    (mark) => !targetMarks.includes(mark)
  )

  /**
   * An ordered array of marks to remove
   */
  const orderedMarksToRemove: MarkKey[] = []

  let loops = 0
  const maxLoops = nextOrderedMarks.length + 1
  while (marksWeNeedToRemove.length > 0) {
    loops = loops + 1
    if (loops > maxLoops)
      throw new Error(
        `Iterated too many times. Indicates an error in the algorithm`
      )
    const markToRemove = nextOrderedMarks.pop()
    if (markToRemove === undefined) throw new Error(`This shouldn't happen`)
    orderedMarksToRemove.push(markToRemove)
    const index = marksWeNeedToRemove.indexOf(markToRemove)
    if (index !== -1) {
      marksWeNeedToRemove.splice(index, 1)
    }
  }
  return { orderedMarksToRemove, nextOrderedMarks }
}
