import { Editor, Element, NodeEntry } from "slate"

import { normalizeSiblings } from "~/src/sink"

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
    case "list":
      return normalizeSiblings(
        editor,
        entry,
        (a, b) => a.type === "list" && b.type === "list" && a.style === b.style
      )
    default:
      return false
  }
}

export { normalizeNode }
