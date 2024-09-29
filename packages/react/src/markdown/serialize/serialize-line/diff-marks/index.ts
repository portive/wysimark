import { MarkKey } from "../../../types"
import { findMarksToAdd } from "./find-marks-to-add"
import { findMarksToRemove } from "./find-marks-to-remove"

/**
 * Takes a set of incoming marks and a set of target markets and returns what
 * marks need to be removed including the order in which they need to be removed
 * and what marks need to be added including the order in which they needed to
 * be added.
 *
 * The algorithm, collectively, is a little complex because we must always
 * remove an inner set of mark symbols before we can remove an outer set. This
 * means that sometimes when we want to remove a mark, we end up actually having
 * to add one. Like in this scenario:
 *
 * **_bold italic_** _italic_
 *
 * In order to go from bold and italic to just italic, we need to first remove
 * the inner italic, then remove the outer bold, and because the italic was
 * removed we need to add back the italic.
 *
 * Note that the algorithm is asymmetrical. It's just the way it has to be.
 */
export function diffMarks(orderedMarks: MarkKey[], targetMarks: MarkKey[]) {
  /**
   * First we remove the marks in order to arrive at our target marks.
   *
   * The algorithm basically just takes off the inner-most (right-most) marks
   * and adds them to `marsToRemove` until we don't have any marks that aren't
   * also in the `targetMarks`.
   *
   * Because we may be over-removing the marks, the method returns a
   * `nextOrderedMarks` or basically the `orderedMarks` after the remove has
   * happened. We then use this as the basis to add any marks we need back to
   * arrive at our `targetMarks`.
   */
  const { orderedMarksToRemove, nextOrderedMarks } = findMarksToRemove(
    orderedMarks,
    targetMarks
  )
  /**
   * We call out to a method that adds the necessary marks back in. The
   * algorithm here is pretty straightforward. Just add back the marks we need
   * and to achieve some level of consistency, add them back in a specific order
   * that feels nice and makes sense. For example, superscript/subscript is more
   * nested than bold because they are more likely to be toggled.
   */
  const { orderedMarksToAdd } = findMarksToAdd(nextOrderedMarks, targetMarks)
  return {
    remove: orderedMarksToRemove,
    add: orderedMarksToAdd,
    nextOrderedMarks: [...nextOrderedMarks, ...orderedMarksToAdd],
  }
}
