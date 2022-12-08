import { Ancestor, Editor, Element, Node, NodeEntry, Range } from "slate"

type MatchNode = string | ((node: Node) => boolean)

/**
 * Takes a string or a function that matches a Node and in both cases,
 * returns a function that matches a Node.
 *
 * The `matchNode` argument can either be a function that takes a `Node` and
 * returns a boolean or it can be a string representing the `type` property of
 * an `Element`
 */
function normalizeMatchNode(matchNode: MatchNode): (node: Node) => boolean {
  return typeof matchNode === "function"
    ? matchNode
    : (node: Node) => Element.isElement(node) && node.type === matchNode
}

/**
 * Checks to see if the current selection is at the end of line for a node
 * that matches the `matchNode` argument.
 *
 * The `matchNode` argument can either be a function that takes a `Node` and
 * returns a boolean or it can be a string representing the `type` property of
 * an `Element`
 */
export function matchNodeEOL(
  editor: Editor,
  matchNode: MatchNode
): NodeEntry<Ancestor> | undefined {
  // if no selection, it's not end of line
  if (editor.selection === null) return
  // If the range is expanded, it's not end of line
  if (Range.isExpanded(editor.selection)) return
  const match = normalizeMatchNode(matchNode)
  // look for a match
  const entry = Editor.above(editor, { match })
  // if no match found, then not end of line
  if (entry === undefined) return
  // if we aren't at the end of the element, then we aren't at end of line
  if (!Editor.isEnd(editor, editor.selection.anchor, entry[1])) {
    return
  }
  // we passed all the failures and so we are at the end of line of the
  // given element.
  return entry
}
