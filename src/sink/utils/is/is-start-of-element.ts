import { Editor } from "slate"

import { NodeMatcher } from "../fix/fix-node-matcher"
import { findElementUp, isCollapsed } from "../match-element"

/**
 * Checks to see if the current selection is at the end of line for a node
 * that matches the `matchNode` argument.
 *
 * The `matchNode` argument can either be a function that takes a `Node` and
 * returns a boolean or it can be a string representing the `type` property of
 * an `Element`
 */

export function isStartOfElement(
  editor: Editor,
  matchNode: NodeMatcher
): boolean {
  const { selection } = editor
  if (!isCollapsed(selection)) return false
  const entry = findElementUp(editor, matchNode, { at: selection })
  return !!entry && Editor.isStart(editor, selection.anchor, entry[1])
}
