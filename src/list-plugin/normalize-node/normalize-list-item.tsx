import { Editor, Element, Node, NodeEntry, Path, Transforms } from "slate"

import { ListContentElement, ListElement, ListItemElement } from "../types"
import { normalizeListItemChildrenTypes } from "./normalize-list-item-children-types"

/**
 * The goal to normalizing a `ListItemElement` is to make sure that
 * there is either exactly one `ListItemElement` as the child or a
 * tuple of a `[ListItemElement, ListElement]` as the two children.
 *
 * These are the steps to normalizing a `ListElement`.
 *
 * 1. Ensure that the children are all of type `ListContentElement` or
 *    `ListElement`. If they are any other type, they are to be
 *    converted into a `ListContentElement`.
 *
 * 2. Check if the first child is a `ListContentElement`. If it's not,
 *    insert a `ListContentElement` in that first position.
 *
 * 3. Check the child at index `1`. If it's a `ListElement` then
 *    set `minIndex=2` otherwise set `minIndex=1`.
 *
 * 4. Iterate backwards.
 *
 *    a. If we come across a `ListContentElement` then we move it to
 *       `Path.next`
 *    b. If we come across a `ListElement`, we check if we are at
 *       `minIndex`. If we are, then we wrap it with a
 *       `ListItemElement` and insert a `ListContentElement`
 *    c. If we aren't at `minIndex`, then we see if the
 *       sibling before it is a `ListContentElement` and if it is
 *       we wrap both in a `ListItemElement` and move it to
 *       `Path.next`
 *    d. If it isn't a `ListContentElement`, then we do the
 *       same as in `b`.
 */
export function normalizeListItem(
  editor: Editor,
  entry: NodeEntry<ListItemElement>
): boolean {
  return normalizeListItemChildrenTypes(editor, entry)

  const [node, path] = entry
  let transformed = false
  /**
   * Indicates the previous path where a newly created `ListItemElement` was
   * inserted. If none has been inserted yet, the `prevInsertPath` is the
   * path of the current `ListItemElement`.
   */
  let prevInsertPath = [...path]
  /**
   * Indicates the index within the `ListItem` where we know we have to start
   * normalizing because the children are invalid. We expect index 0 to be
   * a `ListContentElement` and we expect index 1 to be a `ListElement`. We
   * expect no more children after that.
   *
   * Anything that doesn't fall into those rules needs to be normalized.
   */
  let startIndex = 0
  if (node.children.length >= 1 && node.children[0].type === "list-content") {
    startIndex = 1
    if (node.children.length >= 2 && node.children[1]?.type === "list") {
      startIndex = 2
    }
  }
  // for (let i = startIndex; i < node.children.length; i++) {
  //   const child = node.children[i] as Node
  // }
  // for (let i = node.children.length - 1; i >= 1; i--) {
  //   const child = node.children[i] as
  //     | ListItemElement
  //     | ListElement
  //     | ListContentElement
  //   if (!Element.isElement(child)) continue
  //   if (child.type === "list-content") {
  //     Editor.withoutNormalizing(editor, () => {
  //       Transforms.wrapNodes(
  //         editor,
  //         /**
  //          * We disable typescript because the children will be
  //          * filled with the `list-content` Element we are wrapping.
  //          * This appears to be a typing error in Slate.
  //          */
  //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //         // @ts-ignore
  //         {
  //           type: "list-item",
  //           checked: node.checked === true ? false : node.checked,
  //           children: [],
  //         },
  //         { at: [...path, i] }
  //       )
  //       Transforms.moveNodes(editor, {
  //         at: [...path, i],
  //         to: Path.next(path),
  //       })
  //     })
  //     transformed = true
  //   } else if (child.type === "list-item") {
  //     Transforms.moveNodes(editor, {
  //       at: [...path, i],
  //       to: Path.next(path),
  //     })
  //     transformed = true
  //   }
  // }
  return transformed
}
