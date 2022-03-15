import { Editor, Node, Path, Transforms } from "slate"
import {
  ListItemElement,
  OrderedListItemElement,
  isListItemElement,
} from "../../types"

export function normalizeListItem(
  editor: Editor,
  // DO NOT REMOVE: Useful for type checking incoming element
  element: ListItemElement,
  path: Path
): boolean {
  let normalized = false
  const parentPath = Path.parent(path)
  const nodeIndex = path[-1]

  const listStartIndex = findListStartIndex(editor, parentPath, nodeIndex)

  const listStartKey = JSON.stringify([...parentPath, listStartIndex])

  /**
   * Check if this list has been reordered already and if it has, short-circuit.
   * We don't need to check again.
   */
  if (editor.reorderedLists[listStartKey]) return false

  /**
   * Make the list as ordered using its path stringified
   */
  editor.reorderedLists[listStartKey] = true

  /**
   * Find the end of the list
   */
  const listEndIndex = findListEndIndex(editor, parentPath, nodeIndex)

  /**
   * An `Array` of numbers that represents the current `value` of the list
   * at a given depth.
   */
  const values: number[] = []

  /**
   * Iterate through the list item elements keeping track of the current
   * `values` and adjusting them/setting the props on `OrderedListItemElement`
   */
  for (let i = listStartIndex; i <= listEndIndex; i++) {
    /**
     * Because of our `listStartIndex` and `listEndIndex` algorithms, we know
     * we are getting `ListItemElement` only so we type case these as
     * `ListItemElement`
     */
    const li = Node.get(editor, [...parentPath, i]) as ListItemElement

    /**
     * Delete the stuff that is passed the current depth level
     */
    values.splice(li.depth + 1)

    /**
     * Set the current `value` for the list item element by incrementing the
     * current depth or setting it to `1` if there isn't a value there
     */
    const value = (values[li.depth] =
      values[li.depth] == null ? 1 : values[li.depth] + 1)

    /**
     * If it's not an `ordered-list-item` or if the number already matches,
     * there's nothing to do so `continue`
     */
    if (li.type !== "ordered-list-item" || li.number === value) continue

    Transforms.setNodes<OrderedListItemElement>(
      editor,
      { number: value },
      { at: [...parentPath, i] }
    )
    normalized = true
  }
  return normalized
}

/**
 * Find the position of the start of the current list by iterating backwards
 * from the current position until we run into an element that is not a
 * `ListItemElement`
 */

function findListStartIndex(
  editor: Editor,
  parentPath: Path,
  index: number
): number {
  for (let i = index - 1; i >= 0; i--) {
    const node = Node.get(editor, [...parentPath, i])
    if (isListItemElement(node)) continue
    return i + 1
  }
  return 0
}

/**
 * Find the position of the end of the current list by iterating forwards
 * from the current position until we run into an element that is not a
 * `ListItemElement`
 */

function findListEndIndex(
  editor: Editor,
  parentPath: Path,
  index: number
): number {
  const siblingCount = Node.parent(editor, [...parentPath, index]).children
    .length
  for (let i = index + 1; i < siblingCount; i++) {
    const node = Node.get(editor, [...parentPath, i])
    if (isListItemElement(node)) continue
    return i - 1
  }
  return siblingCount - 1
}
