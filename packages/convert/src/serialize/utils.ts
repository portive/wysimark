import { Text as SlateText } from "slate"

import { MarkKey, MarkProps, Segment, Text } from "../types"
import { isPlainSpace } from "./serialize-line/normalize-line/utils"
import { getCommonAnchorMarks } from "./serialize-line/utils"

export function getMarksPropsFromText(text: Text): MarkProps {
  const { text: _, ...marks } = text
  return marks
}

export function getMarksFromText(text: Text): MarkKey[] {
  const { text: _, ...marks } = text
  return Object.keys(marks) as MarkKey[]
}

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
     * TODO:
     *
     * Need to handle images still.
     */
    throw new Error(`Unhandled type ${segment.type}`)
  }
}
