import { Text as SlateText } from "slate"

import { MarkKey, Segment } from "../../types"
import { getMarksFromSegment } from "../utils"
import { diffMarks } from "./diff-marks"
import { MARK_KEY_TO_TOKEN } from "./mark-constants"
import { normalizeLine } from "./normalize-line"
import { isPlainSpace } from "./normalize-line/utils"

function convertMarksToSymbols(marks: MarkKey[]) {
  return marks
    .map((mark) => (mark in MARK_KEY_TO_TOKEN ? MARK_KEY_TO_TOKEN[mark] : ""))
    .join("")
}

export function serializeLine(inputSegments: Segment[]): string {
  const segments = normalizeLine(inputSegments)
  const substrings: string[] = []

  // eslint-disable-next-line prefer-const
  let leadingDiff = diffMarks([], getMarksFromSegment(segments[0]))

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
    }

    /**
     * Now we are searching for the next segment which we want to grab the marks
     * from. Basically, any segment that isn't a space. For clarity, in this
     * algorithm, we should never have two `isPlainSpace` segments in a row
     * because this would have been normalized to one `isPlainSpace` segment in
     * the call to `normalizeLine`
     */
    const nextMarks = getNextMarks(segments, i)
  }
  return substrings.join("")
}

function getNextMarks(segments: Segment[], i: number): MarkKey[] {
  const nextSegment = segments[i + 1]
  if (!isPlainSpace(nextSegment)) return getMarksFromSegment(nextSegment)
  const nextNextSegment = segments[i + 2]
  if (!isPlainSpace(nextNextSegment)) return getMarksFromSegment(nextSegment)
  return []
}
