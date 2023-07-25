import { MarkKey } from "../../../types"

/**
 * Takes a list of our current `orderedMarks` (i.e. what marks have been applied
 * to our text and in which order) and then gives us a list of `targetMarks`
 * which, for clarity, the order doesn't matter.
 *
 * We then create a list of `orderedMarksToRemove` which is a list of marks we
 * need to remove in the correct order, in order to satisfy that there aren't
 * any marks left that aren't also in the `targetMarks`.
 */
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

  /**
   * We iterate a maximum number of times with an upper limit of
   * `nextOrderedMarks.length` to prevent infinite loops.
   *
   * If we meet our condition of removing all the `marksWeNeedToRemove` we are
   * going to break out of this loop early which is common. Used a for loop
   * instead of counting the number of loops and throwing an error.
   */
  for (let i = 0; i < orderedMarks.length; i++) {
    /**
     * If we don't have any more marks we need to remove, we are done so leave
     * the loop.
     */
    if (marksWeNeedToRemove.length === 0) break
    /**
     * Remove the last mark
     */
    const markToRemove = nextOrderedMarks.pop()
    if (markToRemove === undefined) {
      throw new Error(
        `This shouldn't happen unless we made a mistake in the algorithm`
      )
    }
    /**
     * Add to our `orderedMarkToRemove` which is done in the correct order
     * because we are popping them off from the right.
     */
    orderedMarksToRemove.push(markToRemove)

    /**
     * Whatever we added to our list of `orderedMarksToRemove` we can now take
     * off our list of `marksWeNeedToRemove`. Sometimes we will be removed marks
     * that don't take anything off our list of `marksWeNeedToRemove` because of
     * the order in which we need to remove marks.
     *
     * For this reason, the check to see if the `mark` was in our list of
     * `marksWeNeedToRemove` is important.
     */
    const index = marksWeNeedToRemove.indexOf(markToRemove)
    if (index !== -1) {
      marksWeNeedToRemove.splice(index, 1)
    }
  }

  return { orderedMarksToRemove, nextOrderedMarks }
}
