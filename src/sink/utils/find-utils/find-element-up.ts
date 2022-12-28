import { Ancestor, Editor, Element, NodeEntry, Path } from "slate"

import { BetterAt, betterAt } from "../core-utils/better-at"
import {
  NodeMatcher,
  standardizeNodeMatcher,
} from "../standardize-utils/standardize-node-matcher"

/**
 * Checks to see if the current selection is inside of a Node that matches
 * `matchNode`.
 */
export function findElementUp<T extends Ancestor & Element = Element>(
  editor: Editor,
  matchNode: NodeMatcher,
  { at = editor.selection }: { at?: BetterAt } = {}
): NodeEntry<T> | undefined {
  // if no selection, there will be no match
  if (at === null) return
  const nextAt = betterAt(editor, at)
  const match = standardizeNodeMatcher(matchNode)
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

export function findElementUpPath(...args: Parameters<typeof findElementUp>) {
  const entry = findElementUp(...args)
  return entry?.[1]
}
