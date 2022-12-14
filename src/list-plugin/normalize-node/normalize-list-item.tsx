import { Editor, NodeEntry } from "slate"

import { ListItemElement } from "../types"
import {
  normalizeListItemChildrenTypes,
  normalizeListItemFirst,
} from "./normalize-list-item-children-types"
import {
  normalizeListItemHangingContent,
  normalizeListItemHangingList,
} from "./normalize-list-item-tuple"

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
  /**
   * Make sure the first child is a ListContentElement
   */
  if (normalizeListItemFirst(editor, entry)) return true
  /**
   * Make sure the children are all
   *
   * `( ListContentElement | ListElement )[]`
   */
  if (normalizeListItemChildrenTypes(editor, entry)) return true
  /**
   * Make sure the last child isn't a hanging ListElement
   */
  if (normalizeListItemHangingList(editor, entry)) return true
  /**
   * Make sure the last child isn't a hanging ListContentElement
   */
  if (normalizeListItemHangingContent(editor, entry)) return true
  return false
}
