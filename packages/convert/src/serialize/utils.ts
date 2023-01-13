import { MarkProps, Text } from "../types"

export function getMarksPropsFromText(text: Text): MarkProps {
  const { text: _, ...marks } = text
  return marks
}
