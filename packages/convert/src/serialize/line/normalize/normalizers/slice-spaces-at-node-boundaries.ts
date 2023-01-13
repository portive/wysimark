import { Text } from "../../../../types"
import { isSpace, isText, NormalizeOptions } from "../utils"

export function sliceSpacesAtNodeBoundaries({
  node,
  nodes,
  index,
}: NormalizeOptions): boolean {
  if (!isText(node)) return false
  if (isSpace(node)) return false
  const match = node.text.match(/^(\s*)(.*?)(\s*)$/)
  if (!match) return false
  if (match[1].length === 0 && match[3].length === 0) return false
  const nextSegments: Text[] = [
    { text: match[1] },
    { ...node, text: match[2] },
    { text: match[3] },
  ].filter((text) => text.text !== "")
  nodes.splice(index, 1, ...nextSegments)
  return true
}
