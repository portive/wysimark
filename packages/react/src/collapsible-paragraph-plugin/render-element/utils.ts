import { Element, Node } from "slate"

/**
 * We check for empty by checking for one node that contains a text that is
 * empty. If there is an inline element, this will introduce at a minimum
 * 3 nodes based on the way Slate normalizes to always have text nodes at
 * the end which is why this check works.
 */
export function getIsEmpty(element: Element) {
  return (
    element.children.length === 1 &&
    Node.string(element.children[0]).length === 0
  )
}
