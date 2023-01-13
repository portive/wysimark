import { isElement, isSpace, isText, NormalizeOptions } from "./utils"

export function trimSpaceAtStart({
  index,
  segments,
  node,
  parent,
}: NormalizeOptions): boolean {
  if (index !== 0) return false
  if (segments.length === 0) return false
  if (!isText(node)) return false
  if (!isSpace(node)) return false
  if (parent && isElement(parent) && parent.type === "line") {
    segments.splice(0, 1)
    return true
  }
  return false
}
