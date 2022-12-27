import { Editor, Element, Node, NodeEntry } from "slate"

import { normalizeSiblingParagraphs } from "./normalize-sibling-paragraphs"
import { normalizeSiblingWalls } from "./normalize-sibling-walls"

export function normalizeNode(editor: Editor, entry: NodeEntry<Node>): boolean {
  const [node, path] = entry
  if (!Element.isElement(node)) return false
  if (normalizeSiblingWalls(editor, [node, path])) return true
  if (normalizeSiblingParagraphs(editor, [node, path])) return true
  return false
}
