import { isSpace, isText, NormalizeOptions } from "../utils"

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
  if (!isText(node) || !isSpace(node)) return false
  if (!isText(nextNode) || !isSpace(nextNode)) return false
  nodes.splice(index, 2, { text: `${node.text}${nextNode.text}` })
  return true
}
