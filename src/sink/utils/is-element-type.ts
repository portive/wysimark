import { Element, Node } from "slate"

export function isElementType<T extends Element>(
  node: Node,
  type: T["type"] | Array<T["type"]>
): node is T {
  if (Array.isArray(type)) {
    return Element.isElement(node) && type.includes(node.type)
  }
  if (typeof type === "string") {
    return Element.isElement(node) && node.type === type
  }
  throw new Error(
    `Expected elementType to be string or array of string but is ${type}`
  )
}

export function createIsElementType<T extends Element>(
  type: T["type"] | Array<T["type"]>
): (node: Node) => node is T {
  if (Array.isArray(type)) {
    return (node: Node): node is T =>
      Element.isElement(node) && type.includes(node.type)
  } else {
    return (node: Node): node is T =>
      Element.isElement(node) && type == node.type
  }
}
