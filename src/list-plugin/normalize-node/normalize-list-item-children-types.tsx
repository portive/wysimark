import { Editor, Element, Node, NodeEntry, Path, Transforms } from "slate"

import { getLines } from "~/src/sink"

import { ListContentElement, ListItemElement } from "../types"

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
   * backwards and process it backwards.
   */
  for (let i = children.length - 1; i >= 0; i--) {
    const child = children[i] as Element
    const childPath = [...path, i]
    console.log("child", child, childPath)
    if (["list-content", "list"].includes(child.type)) continue

    /**
     * We have found a `Node` that is not a `list-content` or `list-item`
     * and now need to convert it.
     *
     * We convert these by looking for
     */
    transformed = true
    const matchEntries = [
      ...Editor.nodes(editor, {
        at: childPath,
        mode: "all",
        match: (node) =>
          Element.isElement(node) && Editor.hasInlines(editor, node),
        reverse: true,
      }),
    ]

    /**
     * We are always inserting immediately after the current childPath which
     * is where we typically find `list-content` and nested `list`
     */
    const nextPath = Path.next(childPath)
    for (const matchEntry of matchEntries) {
      const [, matchPath] = matchEntry
      /**
       * Create a new `list-content` which will contain the children of
       * the match
       */
      const nextListContent: ListContentElement = {
        type: "list-content",
        children: [],
      }
      Editor.withoutNormalizing(editor, () => {
        /**
         * Insert the empty `list-content` right after the child we are
         * currently looking at.
         */
        Transforms.insertNodes(editor, nextListContent, {
          at: nextPath,
        })
        /**
         * Move the children of the match
         */
        Transforms.moveNodes(editor, {
          at: matchPath,
          match: (node, path) => path.length === matchPath.length + 1,
          to: [...nextPath, 0],
        })
        // Transforms.removeNodes(editor, { at: childPath })
      })
    }
    Transforms.removeNodes(editor, { at: childPath })

    transformed = true
  }
  return transformed
}
