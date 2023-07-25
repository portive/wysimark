import { isElement, isPlainSpace, isText } from "../../utils"
import { NormalizeOptions } from "../types"

export function trimSpaceAtStartOfLine({
  index,
  nodes,
  node,
  parent,
}: NormalizeOptions): boolean {
  if (index !== 0) return false
  if (nodes.length === 0) return false
  if (!isText(node)) return false
  if (!isPlainSpace(node)) return false
  if (parent && isElement(parent) && parent.type === "line") {
    nodes.splice(0, 1)
    return true
  }
  return false
}
