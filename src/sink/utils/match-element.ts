import {
  Ancestor,
  Editor,
  Element,
  Location,
  Node,
  NodeEntry,
  Path,
  Range,
} from "slate"

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
 * Checks to see if the current selection is inside of a Node that matches
 * `matchNode`.
 */
export function matchElement<T extends Ancestor & Element = Element>(
  editor: Editor,
  matchNode: MatchNode,
  { at = editor.selection }: { at?: Location | null } = {}
): NodeEntry<T> | undefined {
  // if no selection, there will be no match
  if (at === null) return
  const match = normalizeMatchNode(matchNode)
  /**
   * Normally, we are looking up from a range or a point, but if the `at`
   * `Location` is a `Path`, then we need to check for an exact match at the
   * `at` `Location` in addition to looking `Editor.above` the current
   * `at` `Location`
   */
  if (Path.isPath(at)) {
    const nodeEntryExactlyAt = Editor.node(editor, at)
    if (nodeEntryExactlyAt && match(nodeEntryExactlyAt[0])) {
      return nodeEntryExactlyAt as NodeEntry<T>
    }
  }
  // look for a matching element
  return Editor.above(editor, { at, match })
}

/**
 * Checks to see if the current selection is at the end of line for a node
 * that matches the `matchNode` argument.
 *
 * The `matchNode` argument can either be a function that takes a `Node` and
 * returns a boolean or it can be a string representing the `type` property of
 * an `Element`
 */
export function matchEndOfElement(
  editor: Editor,
  matchNode: MatchNode
): NodeEntry<Ancestor> | undefined {
  if (editor.selection === null) return
  const entry = matchElement(editor, matchNode)
  if (entry === undefined) return
  if (Range.isExpanded(editor.selection)) return
  // if we aren't at the end of the element, then we aren't at end of line
  if (!Editor.isEnd(editor, editor.selection.anchor, entry[1])) {
    return
  }
  // we passed all the failures and so we are at the end of line of the
  // given element.
  return entry
}

/**
 * NOTE:
 *
 * NOT TESTED YET!
 *
 * Use in lists where hitting enter in an empty list item should outdent the
 * list at that position.
 */
export function matchEmptyElement(
  editor: Editor,
  matchNode: MatchNode
): NodeEntry<Ancestor> | undefined {
  if (editor.selection === null) return
  const entry = matchElement(editor, matchNode)
  if (entry === undefined) return
  if (!Editor.isEmpty(editor, entry[0])) return
  return entry
}
