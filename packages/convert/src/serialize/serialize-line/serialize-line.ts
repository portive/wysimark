import { Text as SlateText } from "slate"

import { MarkKey, Segment } from "../../types"
import { getMarksFromSegment } from "../utils"
import { MARK_KEY_TO_TOKEN } from "./constants"
import { diffMarks } from "./diff-marks"
import { normalizeLine } from "./normalize-line"
import { isPlainSpace } from "./normalize-line/utils"
import { getCommonAnchorMarks } from "./utils"

function convertMarksToSymbols(marks: MarkKey[]) {
  return marks
    .map((mark) => (mark in MARK_KEY_TO_TOKEN ? MARK_KEY_TO_TOKEN[mark] : ""))
    .join("")
}

export function serializeLine(
  inputSegments: Segment[],
  leadingMarks: MarkKey[] = [],
  trailingMarks: MarkKey[] = []
): string {
  const segments = normalizeLine(inputSegments)
  const substrings: string[] = []

  // eslint-disable-next-line prefer-const
  let leadingDiff = diffMarks(leadingMarks, getMarksFromSegment(segments[0]))

  /**
   * In each iteration, we want to serialize the following:
   *
   * - Symbols that represent all the marks to add to this segment
   * - The text for the segment itself
   * - Symbols that represent all the marks to remove from this segment
   */
  for (let i = 0; i < segments.length; i++) {
    /**
     * This is the current segment that we are looking at and it should not be a
     * plain space segment. If it is, something went wrong.
     */
    const segment = segments[i]

    /**
     * If the current segment is just a plain text string, then we just want to
     * add the spaces as is to the returned string.
     *
     * We continue which preserves the `leadingDiff` from the last segment that
     * we processed.
     */
    if (SlateText.isText(segment) && isPlainSpace(segment)) {
      substrings.push(segment.text)
      continue
    }

    /**
     * Here is where we add the serialization of a proper Text segment.
     *
     * First we start by adding the symbols for adding marks to this segment.
     */
    substrings.push(convertMarksToSymbols(leadingDiff.add))

    /**
     * Then we add the Text for the segment
     */
    if (SlateText.isText(segment)) {
      substrings.push(segment.text)
    } else if (segment.type === "anchor") {
      const commonAnchorMarks = getCommonAnchorMarks(
        segment.children as Segment[]
      )
      substrings.push(
        /**
         * TODO:
         *
         * We type cast `children` as `Segment` here because the children of an
         * `anchor` is limited to be Inline types. There are two things to do
         * related to this though:
         *
         * - [ ] consider fixing the `anchor` type to actually limit the
         *   children as expected.
         * - [ ] consider expanding the definition of `Segment` to include
         *   inline images as that is an acceptable inline value which is
         *   currently not defined as part of Segment.
         */
        `[${serializeLine(
          segment.children as Segment[],
          commonAnchorMarks,
          commonAnchorMarks
        )}](${segment.href})`
      )
    }

    /**
     * Now we are searching for the next segment which we want to grab the marks
     * from. Basically, any segment that isn't a space. For clarity, in this
     * algorithm, we should never have two `isPlainSpace` segments in a row
     * because this would have been normalized to one `isPlainSpace` segment in
     * the call to `normalizeLine`
     */
    const nextMarks = getNextMarks(segments, i, trailingMarks)
    const trailingDiff = diffMarks(leadingDiff.nextOrderedMarks, nextMarks)
    substrings.push(convertMarksToSymbols(trailingDiff.remove))

    /**
     * The `trailingDiff` becomes the new `leadingDiff`
     */
    leadingDiff = trailingDiff
  }
  return substrings.join("")
}

function getNextMarks(
  segments: Segment[],
  i: number,
  trailingMarks: MarkKey[]
): MarkKey[] {
  /**
   * Look at the next Segment
   * - Check to see if the next Segment exists.
   * - If it doesn't, then next marks will be `trailingMarks`
   * - It it does exist, we grab the marks from the Segment.
   * - If the segment is a plain space (not a code space) then the next
   *   marks is not from the space but from the next next segment.
   * - If the segment is an anchor, `getMarksFromSegment` will be the lowest
   *   common marks inside the anchor.
   */
  const nextSegment: Segment | undefined = segments[i + 1]
  if (nextSegment === undefined) return trailingMarks
  if (!isPlainSpace(nextSegment)) return getMarksFromSegment(nextSegment)

  /**
   * DO the same for the next next Segment
   */
  const nextNextSegment: Segment | undefined = segments[i + 2]
  if (nextNextSegment === undefined) return trailingMarks
  if (!isPlainSpace(nextNextSegment))
    return getMarksFromSegment(nextNextSegment)
  throw new Error(
    `It looks like we hit two plain space segments in a row but this shouldn't happen`
  )
}
