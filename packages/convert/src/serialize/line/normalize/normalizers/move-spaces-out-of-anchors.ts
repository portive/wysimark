import { isSpace, isText, NormalizeOptions } from "../utils"

export function moveSpacesOutOfAnchors({
  node,
  nextNode,
  nodes,
  index,
}: NormalizeOptions): boolean {
  if (!isText(node) || !isSpace(node)) return false
  if (!isText(nextNode) || !isSpace(nextNode)) return false
  nodes.splice(index, 2, { text: `${node.text}${nextNode.text}` })
  return true
}
