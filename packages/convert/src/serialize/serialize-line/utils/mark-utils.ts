import { Text as SlateText } from "slate"

import { MarkKey, Segment, Text } from "../../../types"
import { MARK_KEY_TO_TOKEN } from "../constants"
import { getCommonAnchorMarks } from "."
import { isPlainSpace } from "./is-utils"

/**
 * Gets all the marks in current `Text`
 */
export function getMarksFromText(text: Text): MarkKey[] {
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
     * TODO:
     *
     * Need to handle images still.
     */
    throw new Error(`Unhandled type ${segment.type}`)
  }
}

/**
 * Convert a single mark to a string
 */
function convertMarkToSymbol(mark: MarkKey): string {
  if (mark in MARK_KEY_TO_TOKEN) return MARK_KEY_TO_TOKEN[mark]
  throw new Error(
    `Could not find mark ${JSON.stringify(mark)} in MARK_KEY_TO_TOKEN lookup`
  )
}

/**
 * Convert an array of marks to a string
 */
export function convertMarksToSymbols(marks: MarkKey[]) {
  return marks.map(convertMarkToSymbol).join("")
}
