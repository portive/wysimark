import { Element as SlateElement, Text as SlateText } from "slate"

import { MarkKey, Segment } from "../../types"
import { diffMarks } from "./diff-marks"
import { normalizeLine } from "./normalize-line"
import { serializeSegment } from "./segment/serialize-segment"
import {
  convertMarksToSymbolsExceptCode,
  getMarksFromSegment,
  isPlainSpace,
} from "./utils"

/**
 * Takes a line (an array of Segment) and turns it into markdown.
 *
 * The majority of this code deals with how we convert marks like `bold` and
 * `italic` into symbols and where to place them. There are several complicated
 * cases we need to handle like:
 *
 * - Symbols must always be placed on the inside of spaces next to the word like
 *   " **bold** " and not "** bold **". We need to be aware of our placement of
 *   symbols around spaces but spaces themselves can safely and actually must
 *   ignore the actual marks on them. A bold space and a not-bold space are
 *   considered the same in Markdown.
 * - Anchors must have common marks moved out of them
 * - Anchors must have not common marks set inside of them
 */
export function serializeLine(
  inputSegments: Segment[],
  leadingMarks: MarkKey[] = [],
  trailingMarks: MarkKey[] = []
): string {
  /**
   * Normalize line does a lot of the work here to take any spaces that can be
   * found around the edges of segments and turns them into their own segments.
   * We don't need to do this in spaces on the inside of segments though.
   *
   * This is important because at the boundaries of segments, that's when marks
   * change (e.g. bold/italic) and it is at these points, we need to put spaces
   * into separate segments so that we can place the symbols for the marks
   * around them.
   */
  const segments = normalizeLine(inputSegments)
  const substrings: string[] = []

  /**
   * In order to seed the loop, we start by creating a `leadingDiff` going from
   * the `leadingMarks` provided to this method and the marks in the first
   * segment.
   *
   * The `leadingMarks` will always be `[]` at the beginning. When we get into a
   * nested `anchor` though, there may be some marks that had been previously
   * set outside of the anchor that need to be considered.
   */
  let leadingDiff = diffMarks(leadingMarks, getMarksFromSegment(segments[0]))

  /**
   * In each iteration, we want to serialize the following:
   *
   * - Symbols that represent all the marks to add to this segment
   * - The markdown for the segment itself (text, inline code, anchor, inline
   *   image)
   * - Symbols that represent all the marks to remove from this segment
   */
  for (let i = 0; i < segments.length; i++) {
    /**
     * This is the current segment that we are looking at.
     */
    const segment = segments[i]

    /**
     * If it's plain space, add it to markdown and start at the top of the loop
     * again
     *
     * Basically, ignore the symbols we need to add when it's a space.
     *
     * The symbols get handled by the non-space segments.
     *
     * When we continue, we end up with the same `leadingDiff` from the last
     * segment which is what we want. This is because the `leadingDiff` actually
     * applies to the next Segment which should be either a not space Text or an
     * Element.
     */
    if (SlateText.isText(segment) && isPlainSpace(segment)) {
      substrings.push(segment.text)
      continue
    }

    /**
     * Here is where we add the serialization of the segment.
     *
     * First we start by adding the symbols needed to add the marks to this
     * segment.
     */
    substrings.push(convertMarksToSymbolsExceptCode(leadingDiff.add))

    /**
     * Then we add the Text or the Anchor for the segment
     */
    substrings.push(serializeSegment(segment))

    /**
     * Now we are searching for the next segment which we want to grab the marks
     * from. Basically, any segment that isn't a space. For clarity, in this
     * algorithm, we should never have two `isPlainSpace` segments in a row
     * because this would have been normalized to one `isPlainSpace` segment in
     * the call to `normalizeLine`
     */
    const nextMarks = getNextMarks(segments, i, trailingMarks)
    const trailingDiff = diffMarks(leadingDiff.nextOrderedMarks, nextMarks)
    substrings.push(convertMarksToSymbolsExceptCode(trailingDiff.remove))

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
    if (SlateElement.isElement(segment) && segment.type === "image-inline")
      continue
    return getMarksFromSegment(segment)
  }
  return trailingMarks
}
