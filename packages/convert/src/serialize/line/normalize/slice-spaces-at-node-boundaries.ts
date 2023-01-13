import { Text } from "../../../types"
import { isSpace, isText, NormalizeOptions } from "./utils"

export function sliceSpacesAtNodeBoundaries({
  node: segment,
  nodes: segments,
  index,
}: NormalizeOptions): boolean {
  if (!isText(segment)) return false
  if (isSpace(segment)) return false
  const match = segment.text.match(/^(\s*)(.*?)(\s*)$/)
  if (!match) return false
  if (match[1].length === 0 && match[3].length === 0) return false
  const nextSegments: Text[] = [
    { text: match[1] },
    { ...segment, text: match[2] },
    { text: match[3] },
  ].filter((text) => text.text !== "")
  segments.splice(index, 1, ...nextSegments)
  return true
}
