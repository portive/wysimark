import { Editor, Element, NodeEntry, Transforms } from "slate"

import { transformElementFromLines } from "~/src/sink/utils/transform-element-from-lines"

import { ListItemElement } from "../types"

/**
 * Ensure that the children are all of type `ListContentElement` or
 * `ListElement`. If they are any other type, they are to be
 * converted into a `ListContentElement`.
 */
export function normalizeListItemChildrenTypes(
  editor: Editor,
  entry: NodeEntry<ListItemElement>
): boolean {
  const [node, path] = entry
  const { children } = node
  let transformed = false
  /**
   * Here we are iterating over the child of a `list-item` which we are
   * expecting to all be `list-content` or `list` types.
   *
   * If we encounter something that isn't a list, we will convert it to a
   * `list-content`.
   *
   * In order to achieve this efficiently, we iterate over the children
   * backwards because the conversion process may leave more or less elements
   * in its place causing the index to change. By going backwards, we don't
   * have to worry about this.
   */
  for (let i = children.length - 1; i >= 0; i--) {
    const child = children[i] as Element
    const childPath = [...path, i]
    if (["list-content", "list"].includes(child.type)) continue
    /**
     * We have found a `Node` that is not a `list-content` or `list-item`
     * and now need to convert it.
     *
     * We convert these by looking for
     */
    transformElementFromLines(editor, childPath, () => ({
      type: "list-content",
      children: [],
    }))
    transformed = true
  }
  return transformed
}

export function normalizeListItemFirst(
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
