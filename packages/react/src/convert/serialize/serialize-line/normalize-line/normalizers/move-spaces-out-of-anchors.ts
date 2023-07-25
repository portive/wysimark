import { Segment } from "../../../../types"
import { isElement, isPlainSpace, isText } from "../../utils"
import { NormalizeOptions } from "../types"

export function moveSpacesAtStartOfAnchor({
  node,
  nodes,
  prevNode,
  index,
}: NormalizeOptions): boolean {
  if (!isElement(node)) return false
  if (node.type !== "anchor") return false
  node
  const firstChild = node.children[0] as Segment
  if (isText(firstChild) && isPlainSpace(firstChild)) {
    // remove the first child from the anchor
    node.children.splice(0, 1)
    // add the first child
    if (isText(prevNode) && isPlainSpace(prevNode)) {
      prevNode.text = `${prevNode.text}${firstChild.text}`
    } else {
      nodes.splice(index, 0, { text: firstChild.text })
    }
    return true
  }
  return false
}

export function moveSpacesAtEndOfAnchor({
  node,
  nodes,
  nextNode,
  index,
}: NormalizeOptions): boolean {
  if (!isElement(node)) return false
  if (node.type !== "anchor") return false
  node
  const lastChild = node.children[node.children.length - 1] as Segment
  if (isText(lastChild) && isPlainSpace(lastChild)) {
    // remove the first child from the anchor
    node.children.splice(node.children.length - 1, 1)
    // add the first child
    if (isText(nextNode) && isPlainSpace(nextNode)) {
      nextNode.text = `${lastChild.text}${nextNode.text}`
    } else {
      nodes.splice(index + 1, 0, { text: lastChild.text })
    }
    return true
  }
  return false
}
