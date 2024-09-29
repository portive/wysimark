import { Text as SlateText } from "slate"

import { MarkKey, Segment, Text } from "../../../../types"
import { isPlainSpace, isText } from "../is-utils"

/**
 * Gets all the marks in current `Text`
 */
export function getMarksFromText(text: Text): MarkKey[] {
  /**
   * disable esling to eat the `_` without throwing an error
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { text: _, ...marks } = text
  return Object.keys(marks) as MarkKey[]
}

/**
 * Gets all the marks from the current segment
 */
export function getMarksFromSegment(segment: Segment): MarkKey[] {
  if (SlateText.isText(segment)) {
    if (isPlainSpace(segment)) {
      throw new Error(
        `You probably didn't mean to do this. We should only be getting marks from segments that are not plain space segments.`
      )
    }
    return getMarksFromText(segment)
  } else if (segment.type === "anchor") {
    return getCommonAnchorMarks(segment.children as Segment[])
  } else {
    /**
     * TODO: Need to handle images still.
     */
    throw new Error(`Unhandled type ${segment.type}`)
  }
}

export function getCommonAnchorMarks(segments: Segment[]): MarkKey[] {
  let commonMarks: MarkKey[] | undefined
  for (const segment of segments) {
    if (!isText(segment)) {
      /**
       * Use this to test for images in anchors
       *
       * [![Semantic description](https://roneo.org/img/ok.png "Your title")](http://jamstack.club)
       */
      if (segment.type === "image-inline") continue
      /**
       * TODO: This is not actually true. It can be an inline image which we
       * still need to add.
       */
      throw new Error(
        `Expected every segment in an anchor to be a Text segment`
      )
    }
    if (isPlainSpace(segment)) continue
    const currentMarks = getMarksFromText(segment)
    if (commonMarks === undefined) {
      commonMarks = currentMarks
      continue
    }
    commonMarks = commonMarks.filter((commonMark) =>
      currentMarks.includes(commonMark)
    )
  }
  if (commonMarks === undefined)
    throw new Error(
      `No text segments were found as children in this anchor which should not be possible`
    )
  return commonMarks
}
