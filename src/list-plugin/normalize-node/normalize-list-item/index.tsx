import { Editor, NodeEntry } from "slate"

import { ListItemElement } from "../../types"
import { normalizeListItemChildrenHangingContent } from "./normalize-list-item-children-hanging-content"
import { normalizeListItemChildrenHangingList } from "./normalize-list-item-children-hanging-list"
import { normalizeListItemChildrenTypes } from "./normalize-list-item-children-types"
import { normalizeListItemFirstChild } from "./normalize-list-item-first-child"

/**
 * The goal to normalizing a `ListItemElement` is to make sure that
 * there is either exactly one `ListItemElement` as the child or a
 * tuple of a `[ListItemElement, ListElement]` as the two children.
 *
 * These are the steps to normalizing:
 *
 * - Make sure the first child is a `ListContentElement`.
 *   If it's not, insert one at the start.
 *
 * - Make sure the childrenn are all `ListContentElement` or `ListElement`.
 *   If they're not, convert them into `ListContentElement`
 *
 * - Make sure that the last child is not an invalid `ListContentElement`.
 *   If it is, move it into a new `ListItemElement` as the next sibling.
 *
 * - Make sure that the last child is not an invalid `ListElement`.
 *   If it is, move it into a new `ListItemElement` as the next sibling.
 *   If the child before it is a `ListContentElement` take that one too
 *   as it will make a valid tuple for a `ListItemElement`'s children.
 */
export function normalizeListItem(
  editor: Editor,
  entry: NodeEntry<ListItemElement>
): boolean {
  /**
   * Make sure the first child is a ListContentElement
   */
  if (normalizeListItemFirstChild(editor, entry)) return true
  /**
   * Make sure the children are all
   *
   * `( ListContentElement | ListElement )[]`
   */
  if (normalizeListItemChildrenTypes(editor, entry)) return true
  /**
   * Make sure the last child isn't a hanging ListElement
   */
  if (normalizeListItemChildrenHangingList(editor, entry)) return true
  /**
   * Make sure the last child isn't a hanging ListContentElement
   */
  if (normalizeListItemChildrenHangingContent(editor, entry)) return true
  return false
}
