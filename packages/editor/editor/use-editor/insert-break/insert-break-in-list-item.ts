import { Editor, Node, Transforms } from "slate"
import { ListItemElement, isListItemElement } from "../../types"

export function insertBreakInListItem(
  editor: Editor,
  originalInsertBreak: () => void
): boolean {
  /**
   * Check if we're in a list.
   */
  const listItemEntry = Editor.above<ListItemElement>(editor, {
    match: isListItemElement,
  })

  /**
   * If we're not in a list, exit early
   */
  if (listItemEntry == null) return false

  const [listItemNode, listItemPath] = listItemEntry

  const s = Node.string(listItemNode)

  /**
   * If the list item is empty, outdent
   */
  if (s.length === 0) {
    /**
     * Outdent by reducing depth by 1 but only works if depth is greater than 0
     */
    if (listItemNode.depth > 0) {
      Transforms.setNodes(
        editor,
        { depth: listItemNode.depth - 1 },
        { at: listItemPath }
      )
    } else if (listItemNode.depth === 0) {
      /**
       * When depth is 0 turn list item into a paragraph
       */
      Transforms.unsetNodes(editor, ["checked", "depth", "number"])
      Transforms.setNodes(editor, { type: "p" })
    }
    return true
  }

  originalInsertBreak()

  if (listItemNode.type === "task-list-item") {
    Transforms.setNodes(editor, { checked: false })
  }

  return true
}
