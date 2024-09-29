import { MarkKey } from "../../../types"
import { sortMarks } from "../utils"

/**
 * Find the marks to add in ordere to get our orderedMarks to match the
 * `targetMarks`.
 *
 * We do this in a smart, but perhaps, imperfect way.
 *
 * When we need to add marks, we add them in an order that is more likely to
 * reduce the number of marks we add. See the comments under `MARK_KEY_ORDER` to
 * find out how.
 *
 * That said, we could probably choose a more complex algorithm that looks at
 * all the text to find out how to most efficiently place which marks as outer
 * or inner marks; however, there will still be situations in which the choice
 * will be arbitrary and this would likely greatly increase the complexity of
 * the code.
 *
 * This feels like a good trade-off and is likely to cause an unreadable
 * markdown representation. I suppose if for some reason a user had a bunch of
 * superscripted text which was intermittently styled with bold and italic, then
 * we'd have less than ideal markdown.
 */
export function findMarksToAdd(
  orderedMarks: MarkKey[],
  targetMarks: MarkKey[]
) {
  const marksWeNeedToAdd = targetMarks.filter(
    (mark) => !orderedMarks.includes(mark)
  )
  const orderedMarksToAdd = sortMarks(marksWeNeedToAdd)
  return { orderedMarksToAdd }
}
