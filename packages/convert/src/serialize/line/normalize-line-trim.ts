import { Text as SlateText } from "slate"

import { Segment, Text } from "../../types"

function isSpace(segment: Segment) {
  return SlateText.isText(segment) && !!segment.text.match(/^\s+$/)
}

/**
 * This is executed after normalizeLineSpaces.
 *
 * - Removes up to one preceding space segments
 * - Removes up to one trailing space segments
 * - Ensures that there is at least one Text segement left
 */
export function normalizeLineTrim(segments: Text[]) {
  const nextSegments = [...segments]
  /**
   * If the first segment is a space, remove it
   */
  if (nextSegments.length > 0 && isSpace(nextSegments[0])) {
    nextSegments.splice(0, 1)
  }
  /**
   * If the last segement is s pace, remove it
   */
  if (
    nextSegments.length > 0 &&
    isSpace(nextSegments[nextSegments.length - 1])
  ) {
    nextSegments.splice(-1, 1)
  }
  /**
   * If there are no segments, we need to follow the Slate rules and make sure
   * there is at least 1 empty text in it
   */
  if (nextSegments.length === 0) {
    nextSegments.push({ text: "" })
  }
  return nextSegments
}
