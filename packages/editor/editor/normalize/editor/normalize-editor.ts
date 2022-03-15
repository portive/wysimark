import { Editor, Transforms } from "slate"
import { isConvertibleBlockElement } from "../../types"

/**
 * Normalize the Editor by making sure that the last block in the Editor is
 * always a convertible. If not, then insert an empty paragraph.
 */
export function normalizeEditor(editorNode: Editor): boolean {
  /**
   * Last block must be a convertible block like `p`, `heading` or
   * ListItemElement.
   *
   * If it's not, insert an empty paragraph
   */
  const lastBlock = editorNode.children[editorNode.children.length - 1]
  if (!isConvertibleBlockElement(lastBlock)) {
    Transforms.insertNodes(
      editorNode,
      { type: "p", children: [{ text: "" }] },
      { at: [editorNode.children.length] }
    )
    return true
  }
  return false
}
