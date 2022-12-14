import { Editor, NodeEntry, Path } from "slate"

import { ListItemElement } from "../../types"
import { wrapAndMoveNodes } from "../utils"

export function normalizeListItemChildrenHangingContent(
  editor: Editor,
  entry: NodeEntry<ListItemElement>
): boolean {
  const [element, path] = entry
  const { children } = element

  /**
   * No hanging indent if children.length is 1.
   * We already know that the first item is ListContentElement because of the
   * `normalizeListItemFirst`
   */
  if (children.length === 1) return false

  const lastIndex = children.length - 1
  const lastChild = children[lastIndex]

  /**
   * If the lastChild isn't a `list-content` it's not a hanging indent.
   * Might be a hanging `list` though.
   */
  if (lastChild.type !== "list-content") return false

  wrapAndMoveNodes(
    editor,
    { type: "list-item", children: [] },
    {
      srcStart: [...path, lastIndex],
      srcEnd: [...path, lastIndex],
      dest: Path.next(path),
    }
  )
  return true
}
