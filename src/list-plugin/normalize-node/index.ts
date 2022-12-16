import { Editor, Node, NodeEntry } from "slate"

import { isListItem } from ".."
import { normalizeOrderedFirstAtDepth } from "./normalize-ordered-first-at-depth"
export * from "./normalize-ordered-first-at-depth"

export function normalizeNode(editor: Editor, entry: NodeEntry<Node>): boolean {
  const [node] = entry
  /**
   * Short circuit return if current entry isn't any type of list item element.
   */
  if (!isListItem(node)) return false
  return normalizeOrderedFirstAtDepth(editor, entry)
}
