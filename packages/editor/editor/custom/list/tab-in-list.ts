import { Editor, Transforms } from "slate"
import { ListItemElement, isListItemElement } from "../../types"
import { getNodeEntries } from "../util"

/**
 * Handle tabs in list. Use to indent list items and tasks.
 */
export function tabInList(editor: Editor, delta: 1 | -1) {
  const liEntries = getNodeEntries<ListItemElement>(editor, (n) =>
    isListItemElement(n)
  )
  if (liEntries == null) return
  let maxDepth = 0
  let minDepth = 8
  for (const [node] of liEntries) {
    if (node.depth < minDepth) minDepth = node.depth
    if (node.depth > maxDepth) maxDepth = node.depth
  }
  if (delta === -1 && minDepth === 0) return
  if (delta === 1 && maxDepth === 8) return
  for (const [node, pos] of liEntries) {
    const nextDepth = node.depth + delta
    Transforms.setNodes(editor, { depth: nextDepth }, { at: pos })
  }
}
