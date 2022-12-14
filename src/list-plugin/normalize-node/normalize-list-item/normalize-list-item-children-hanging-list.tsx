import { Editor, NodeEntry, Path } from "slate"

import { ListItemElement } from "../../types"
import { wrapAndMoveNodes } from "../utils"

export function normalizeListItemChildrenHangingList(
  editor: Editor,
  entry: NodeEntry<ListItemElement>
): boolean {
  const [element, path] = entry
  const { children } = element

  /**
   * No hanging indent if children.length is 2 or less.
   * We know index 0 is going to be ListContentElement because of an earlier
   * normalizer.
   * We know that index 1 is either a `ListContentElement` or `ListElement`.
   * If it's a `ListContentElement`, that's not this normalizer's problem.
   * If it's a `ListElement`, that's valid so we don't worry about it.
   */
  if (children.length <= 2) return false

  const lastIndex = children.length - 1
  const lastChild = children[lastIndex]
  const lastPath = [...path, lastIndex]

  /**
   * If the lastChild isn't a `list-content` it's not a hanging indent.
   * Might be a hanging `list` though.
   */
  if (lastChild.type !== "list") return false

  const nextToLastIndex = children.length - 2
  const nextToLastChild = children[nextToLastIndex]
  const nextToLastPath = [...path, nextToLastIndex]

  if (nextToLastChild.type === "list-content") {
    wrapAndMoveNodes(
      editor,
      {
        type: "list-item",
        checked: typeof element.checked === "boolean" ? false : undefined,
        children: [],
      },
      { srcStart: nextToLastPath, srcEnd: lastPath, dest: Path.next(path) }
    )
  } else {
    /**
     * If the next to last item isn't a ListContentElement, we wrap the
     * `List` in a `ListItem`. This is invalid but the first item normalizer
     * will fix it for us.
     */
    wrapAndMoveNodes(
      editor,
      {
        type: "list-item",
        checked: typeof element.checked === "boolean" ? false : undefined,
        children: [],
      },
      { srcStart: lastPath, srcEnd: lastPath, dest: Path.next(path) }
    )
  }
  return true
}
