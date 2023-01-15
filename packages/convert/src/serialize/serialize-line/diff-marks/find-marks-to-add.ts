import { MarkKey } from "../../../types"

/**
 * When adding back marks, this is the order in which we add them back.
 *
 * The order is determined by an educated guess about which marks are more
 * likely to be chaging inside other marks. For example, this is probably pretty
 * common:
 *
 * **This is x^2^**
 *
 * Having a superscript inside of a bold. But it's probably rare to have bold
 * switched on/off inside a superscript.
 */
const MARK_KEY_ORDER: MarkKey[] = [
  "bold",
  "italic",
  "underline",
  "strike",
  "sup",
  "sub",
  "code",
]

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
  /**
   * Sort Algorithm
   *
   * https://stackoverflow.com/a/44063445
   */
  const orderedMarksToAdd = marksWeNeedToAdd
    .slice()
    .sort((a, b) => MARK_KEY_ORDER.indexOf(a) - MARK_KEY_ORDER.indexOf(b))

  return { orderedMarksToAdd }
}
