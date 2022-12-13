import { Editor, Element, NodeEntry, Path, Transforms } from "slate"

import { ListContentElement, ListElement, ListItemElement } from "../types"
import { normalizeListItem } from "./normalize-list-item"

function normalizeNode(
  editor: Editor,
  entry: NodeEntry<ListElement | ListItemElement | ListContentElement>
): boolean {
  const [node, path] = entry
  if (!Element.isElement(node)) return false
  switch (node.type) {
    case "list-item":
      return normalizeListItem(editor, [node, path])
    default:
      return false
  }
}

export { normalizeNode }
