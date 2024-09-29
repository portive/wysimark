import { isPlainSpace, isText } from "../../utils"
import { NormalizeOptions } from "../types"

/**
 * If we ever find two spaces next to each other, merge them together.
 *
 * This can happen, for example, if there were spaces next to each other but
 * with different marks. It can also happen from other normalizers. For example,
 * there is a normalizer that moves spaces at the outer edges of an anchor
 * outside of the anchor.
 */
export function mergeAdjacentSpaces({
  node,
  nextNode,
  nodes: nodes,
  index,
}: NormalizeOptions): boolean {
  if (!isText(node) || !isPlainSpace(node) || node.code) return false
  if (!isText(nextNode) || !isPlainSpace(nextNode) || node.code) return false
  nodes.splice(index, 2, { text: `${node.text}${nextNode.text}` })
  return true
}
