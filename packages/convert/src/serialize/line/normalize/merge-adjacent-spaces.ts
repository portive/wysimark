import { isSpace, isText, NormalizeOptions } from "./utils"

export function mergeAdjacentSpaces({
  node: segment,
  nextNode: nextSegment,
  nodes: segments,
  index,
}: NormalizeOptions): boolean {
  if (!isText(segment) || !isSpace(segment)) return false
  if (!isText(nextSegment) || !isSpace(nextSegment)) return false
  segments.splice(index, 2, { text: `${segment.text}${nextSegment.text}` })
  return true
}
