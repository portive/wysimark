import { Editor } from "slate"

import { NodeMatcher } from "../fix/fix-node-matcher"
import { findElementUp } from "../match-element"
import { isCollapsed } from "./is-collapsed"

/**
 * Checks to see if we are currently in an empty element.
 *
 * All these must be true:
 *
 * - There is a selection
 * - The selection is inside the matching element
 * - The matching element is empty
 */
export function isInEmptyElement(
  editor: Editor,
  matchNode: NodeMatcher
): boolean {
  const { selection } = editor
  if (!isCollapsed(selection)) return false
  const entry = findElementUp(editor, matchNode)
  if (entry === undefined) return false
  return Editor.isEmpty(editor, entry[0])
}
