import { Element, Node } from "slate"

export type NodeMatcher = string | string[] | ((node: Node) => boolean)

/**
 * Takes a string or a function that matches a Node and in both cases,
 * returns a function that matches a Node.
 *
 * The `matchNode` argument can either be a function that takes a `Node` and
 * returns a boolean or it can be a string representing the `type` property of
 * an `Element`
 */

export function standardizeNodeMatcher(
  matchNode: NodeMatcher
): (node: Node) => boolean {
  if (typeof matchNode === "function") return matchNode
  if (typeof matchNode === "string")
    return (node: Node) => Element.isElement(node) && node.type === matchNode
  if (Array.isArray(matchNode))
    return (node: Node) =>
      Element.isElement(node) && matchNode.includes(node.type)
  throw new Error(
    `Expected matchNode to be a function, string or array but is ${matchNode}`
  )
}
