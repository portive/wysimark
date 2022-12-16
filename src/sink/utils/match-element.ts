import { Ancestor, Editor, Element, Location, NodeEntry, Path } from "slate"
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
