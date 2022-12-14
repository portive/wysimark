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
  entry: NodeEntry<ListItemElement>
): boolean {
  const [element, path] = entry
  const { children } = element
  if (children.length === 0) {
    throw new Error(`Handle this by inserting a 'list-content' Element`)
  }
  const validChildrenCount = getValidChildrenCount(children)
  if (validChildrenCount === children.length) return false
  const insertPath = Path.next(path)
  const lastIndex = children.length - 1
  const lastChild = children[lastIndex]
  const nextToLastIndex = children.length - 2
  const nextToLastChild = children[nextToLastIndex]
  if (lastChild.type === "list-content") {
    Editor.withoutNormalizing(editor, () => {
      Transforms.wrapNodes(
        editor,
        { type: "list-item", children: [] },
        { at: Editor.range(editor, [...path, lastIndex]) }
      )
      Transforms.moveNodes(editor, {
        at: [...path, lastIndex],
        to: insertPath,
      })
    })
  }
  return true
}
