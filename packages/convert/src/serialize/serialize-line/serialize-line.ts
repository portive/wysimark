import { Text as SlateText } from "slate"

import { MarkKey, Segment } from "../../types"
import { diffMarks } from "./diff-marks"
import { normalizeLine } from "./normalize-line"
import {
  convertMarksToSymbols,
  getCommonAnchorMarks,
  getMarksFromSegment,
  isPlainSpace,
} from "./utils"

/**
 * Takes a line (an array of Segment) and turns it into markdown.
 */
export function serializeLine(
  inputSegments: Segment[],
  leadingMarks: MarkKey[] = [],
  trailingMarks: MarkKey[] = []
): string {
  const segments = normalizeLine(inputSegments)
  const substrings: string[] = []

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

/**
 * Looks for the next set of valid marks by
 *
 * This method is local to `serialize-line` as it's intimiately tied with the
 * call to `getNextMarks` in `serializeLine`
 */
function getNextMarks(
  segments: Segment[],
  index: number,
  trailingMarks: MarkKey[]
): MarkKey[] {
  /**
   * Starting at the index `i` following the current index `index`
   *
   * If it's a plain space, skip it.
   *
   * If it isn't, get the marks for the segment.
   *
   * NOTE:
   *
   * If the segment is an `anchor` we the common marks for all the segments in
   * the anchor not including the plain spaces.
   */
  for (let i = index + 1; i < segments.length; i++) {
    const segment = segments[i]
    if (isPlainSpace(segment)) continue
    return getMarksFromSegment(segment)
  }
  return trailingMarks
}
