import {
  Ancestor,
  Editor,
  Element,
  Location,
  NodeEntry,
  Path,
  Range,
} from "slate"
import { ReactEditor } from "slate-react"

import { fixNodeMatcher, NodeMatcher } from "./fix/fix-node-matcher"

/**
 * We are able to match a `Location`, an `Element` or a `Selection` which
 * could return `null`
 */
export type MatchAt = Location | Element | null

function normalizeFlexibleAt(editor: Editor, at: Location | Element) {
  if (!Element.isElement(at)) return at
  return ReactEditor.findPath(editor, at)
}

/**
 * Checks to see if the current selection is inside of a Node that matches
 * `matchNode`.
 */
export function findElementUp<T extends Ancestor & Element = Element>(
  editor: Editor,
  matchNode: NodeMatcher,
  { at = editor.selection }: { at?: MatchAt } = {}
): NodeEntry<T> | undefined {
  // if no selection, there will be no match
  if (at === null) return
  const nextAt = normalizeFlexibleAt(editor, at)
  const match = fixNodeMatcher(matchNode)
  /**
   * Normally, we are looking up from a range or a point, but if the `at`
   * `Location` is a `Path`, then we need to check for an exact match at the
   * `at` `Location` in addition to looking `Editor.above` the current
   * `at` `Location`
   */
  if (Path.isPath(nextAt)) {
    const nodeEntryExactlyAt = Editor.node(editor, nextAt)
    if (nodeEntryExactlyAt && match(nodeEntryExactlyAt[0])) {
      return nodeEntryExactlyAt as NodeEntry<T>
    }
  }
  // look for a matching element
  return Editor.above(editor, { at: nextAt, match })
}

/**
 * PRIVATE:
 *
 * A private helper function that checkes that there is a selection, that the
 * selection is collapsed and that the selection is in a node that matches
 * the `matchNode` argument.
 */
// function findRangeInElement(
//   editor: Editor,
//   range: Range,
//   matchNode: NodeMatcher
// ): { entry: NodeEntry<Ancestor>; selection: Range } | undefined {
//   const entry = findElementUp(editor, matchNode, { at: range })
//   return entry
// }

function isCollapsed(selection: Range | null): selection is Range {
  if (selection === null) return false
  return Range.isCollapsed(selection)
}

/**
 * Checks to see if the current selection is at the end of line for a node
 * that matches the `matchNode` argument.
 *
 * The `matchNode` argument can either be a function that takes a `Node` and
 * returns a boolean or it can be a string representing the `type` property of
 * an `Element`
 */
export function matchStartOfElement(
  editor: Editor,
  matchNode: NodeMatcher
): NodeEntry<Ancestor> | undefined {
  const { selection } = editor
  if (!isCollapsed(selection)) return
  const entry = findElementUp(editor, matchNode, { at: selection })
  if (!entry || !Editor.isStart(editor, selection.anchor, entry[1])) {
    return
  }
  // we passed all the failures and so we are at the end of line of the
  // given element.
  return entry
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
  matchNode: NodeMatcher
): NodeEntry<Ancestor> | undefined {
  const { selection } = editor
  if (!isCollapsed(selection)) return
  const entry = findElementUp(editor, matchNode, { at: selection })
  if (!entry || !Editor.isEnd(editor, selection.anchor, entry[1])) {
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
  matchNode: NodeMatcher
): NodeEntry<Ancestor> | undefined {
  if (editor.selection === null) return
  const entry = findElementUp(editor, matchNode)
  if (entry === undefined) return
  if (!Editor.isEmpty(editor, entry[0])) return
  return entry
}
