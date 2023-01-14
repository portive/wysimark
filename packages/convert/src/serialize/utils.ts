import { Text as SlateText } from "slate"

import { MarkKey, MarkProps, Segment, Text } from "../types"

export function getMarksPropsFromText(text: Text): MarkProps {
  const { text: _, ...marks } = text
  return marks
}

function getMarksFromText(text: Text): MarkKey[] {
  const { text: _, ...marks } = text
  return Object.keys(marks) as MarkKey[]
}

export function getMarksFromSegment(segment: Segment): MarkKey[] {
  if (SlateText.isText(segment)) {
    return getMarksFromText(segment)
  } else {
    return []
  }
}
