import { Editor, NodeEntry, Path, Transforms } from "slate"

import { ListItemElement } from "../types"

function getValidChildrenCount(children: ListItemElement["children"]) {
  if (children.length === 0) return 0
  if (children[0].type !== "list-content") return 0
  return children.length > 1 && children[1].type === "list" ? 2 : 1
}

/**
 * Ensure that the children are all of type `ListContentElement` or
 * `ListElement`. If they are any other type, they are to be
 * converted into a `ListContentElement`.
 */
export function normalizeListItemTuple(
  editor: Editor,
  listItemEntry: NodeEntry<ListItemElement>
): boolean {
  const [listItemElement, listItemPath] = listItemEntry
  const { children: listItemChildren } = listItemElement
  if (listItemChildren.length === 0) {
    throw new Error(`Handle this by inserting a 'list-content' Element`)
  }
  const validChildrenCount = getValidChildrenCount(listItemChildren)
  for (let i = listItemChildren.length - 1; i >= validChildrenCount; i--) {
    const insertPath = Path.next(listItemPath)
    Editor.withoutNormalizing(editor, () => {
      Transforms.wrapNodes(
        editor,
        { type: "list-item", children: [] },
        { at: [...listItemPath, i] }
      )
      Transforms.moveNodes(editor, { at: [...listItemPath, i], to: insertPath })
    })
  }
  return true
}
