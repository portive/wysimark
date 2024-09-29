import { isElement, isPlainSpace, isText } from "../../utils"
import { NormalizeOptions } from "../types"

export function trimSpaceAtEndOfLine({
  index,
  nodes,
  node,
  parent,
}: NormalizeOptions): boolean {
  if (index !== nodes.length - 1) return false
  if (nodes.length <= 1) return false
  if (!isText(node)) return false
  if (!isPlainSpace(node)) return false
  if (parent && isElement(parent) && parent.type === "line") {
    nodes.splice(nodes.length - 1, 1)
    return true
  }
  return false
}
