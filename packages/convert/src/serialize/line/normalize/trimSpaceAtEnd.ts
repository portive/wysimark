import { isElement, isSpace, isText, NormalizeOptions } from "./utils"

export function trimSpaceAtEnd({
  index,
  segments,
  node,
  parent,
}: NormalizeOptions): boolean {
  if (index !== segments.length - 1) return false
  if (segments.length <= 1) return false
  if (!isText(node)) return false
  if (!isSpace(node)) return false
  if (parent && isElement(parent) && parent.type === "line") {
    segments.splice(segments.length - 1, 1)
    return true
  }
  return false
}
