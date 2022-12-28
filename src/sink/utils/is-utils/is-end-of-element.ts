import { Editor } from "slate"

import { findElementUp } from "../find-utils/find-element-up"
import { NodeMatcher } from "../standardize-utils/standardize-node-matcher"
import { isCollapsed } from "./is-collapsed"

/**
 * Checks to see if the current selection is at the end of line for a node
 * that matches the `matchNode` argument.
 *
 * The `matchNode` argument can either be a function that takes a `Node` and
 * returns a boolean or it can be a string representing the `type` property of
 * an `Element`
 */

export function isEndOfElement(
  editor: Editor,
  matchNode: NodeMatcher
): boolean {
  const { selection } = editor
  if (!isCollapsed(selection)) return false
  const entry = findElementUp(editor, matchNode, { at: selection })
  return !!entry && Editor.isEnd(editor, selection.anchor, entry[1])
}
