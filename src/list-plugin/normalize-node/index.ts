import { Editor, Node, NodeEntry, Transforms } from "slate"

import { isElementType, normalizeSiblings } from "~/src/sink"

import { isListItem, LIST_ITEM_TYPES } from ".."

export function normalizeNode(editor: Editor, entry: NodeEntry<Node>): boolean {
  const [node] = entry
  if (!isListItem(node)) return false
  return normalizeSiblings(editor, entry, (a, b) => {
    if (!isListItem(a[0])) return false
    if (!isListItem(b[0])) return false
    const maxDepth = a[0].depth + 1
    if (b[0].depth <= maxDepth) return false
    Transforms.setNodes(editor, { depth: maxDepth }, { at: b[1] })
    return true
  })
}
