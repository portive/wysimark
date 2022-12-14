import { Editor, NodeEntry, Transforms } from "slate"

import { ListItemElement } from "../../types"

/**
 * Make sure the first child of a ListItemElement is always a ListContentElement.
 *
 * If it's not, insert one.
 */
export function normalizeListItemFirstChild(
  editor: Editor,
  entry: NodeEntry<ListItemElement>
) {
  const [node, path] = entry
  const { children } = node
  if (children[0] && children[0].type !== "list-content") {
    Transforms.insertNodes(
      editor,
      {
        type: "list-content",
        children: [{ text: "" }],
      },
      { at: [...path, 0] }
    )
  }
  return false
}
