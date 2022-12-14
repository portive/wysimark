import { Editor, Element, Node, NodeEntry, Transforms } from "slate"

import { MatchNode, normalizeMatchNode } from "~/src/sink"

import { ListItemElement } from "../../types"

function normalizeParentElement<T extends Node = Node>(
  editor: Editor,
  entry: NodeEntry<T>,
  matchNode: MatchNode,
  createElement: () => Element
) {
  const [, path] = entry
  const [parentNode] = Editor.parent(editor, path)
  const match = normalizeMatchNode(matchNode)

  if (!match(parentNode)) {
    Transforms.wrapNodes(editor, createElement(), { at: path })
  }
  return false
}

/**
 * Make sure the parent of a ListItemElement is always a List.
 *
 * If it's not, insert one.
 */
export function normalizeListItemParent(
  editor: Editor,
  entry: NodeEntry<ListItemElement>
) {
  return normalizeParentElement(editor, entry, "list", () => ({
    type: "list",
    style: "unordered",
    children: [],
  }))
}
