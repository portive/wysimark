import { Editor, Path, Text, Transforms } from "slate"
import { TdElement, UnsafeTdElement, isInlineElement } from "../../types"
import { unwrapOrphanElement, wrapElementIfEmpty } from "../util"

/**
 * Remove children that are not `td` elements
 */

export function normalizeTableCell(
  editor: Editor,
  el: TdElement,
  path: Path
): boolean {
  /**
   * Normalize invalid parent
   *
   * Unwrap if it's not in a `tr`
   */
  if (unwrapOrphanElement(editor, el, path, "tr")) return true
  /**
   * Normalize empty children
   *
   * Ensure that there is at least one `p`
   */
  wrapElementIfEmpty(editor, el, path, {
    type: "p",
    children: [],
  })
  /**
   * Normalize invalid children
   *
   * Should have exactly one child of type `p`.
   *
   * If there is more than one or the wrong type, merge the segments into a
   * single `p`.
   */
  if (mergeTableCellSegmentsIntoSingleP(editor, el, path)) return true
  /**
   * Normalize shape
   *
   * Make sure that each cell has the correct `index`
   */
  if (reindexTableCell(editor, el, path)) return true
  return false
}

function reindexTableCell(editor: Editor, el: TdElement, path: Path): boolean {
  const expectedIndex = path.slice(-1)[0]
  if (el.index == expectedIndex) return false
  Transforms.setNodes(editor, { index: expectedIndex }, { at: path })
  return true
}

function mergeTableCellSegmentsIntoSingleP(
  editor: Editor,
  el: UnsafeTdElement,
  path: Path
): boolean {
  if (el.children.length === 0) throw new Error("Shouldn't happen")
  if (el.children.length === 1 && el.children[0].type === "p") return false
  const insertedParagraphPath = [...path, 0]
  Editor.withoutNormalizing(editor, () => {
    /**
     * Insert a paragraph to move all the other segments into. We could reuse
     * the first `Element` but it complicates the logic.
     */
    Transforms.insertNodes(
      editor,
      { type: "p", children: [] },
      { at: insertedParagraphPath }
    )
    /**
     * Move the children that are `Text` or `Inline` into the inserted `p`
     */
    Transforms.moveNodes(editor, {
      at: path,
      match: (n, p) => {
        return (
          !Path.isAncestor(insertedParagraphPath, p) &&
          (Text.isText(n) || isInlineElement(n))
        )
      },
      to: [...insertedParagraphPath, 0],
    })
    /**
     * Remove all the now empty nodes from which we moved the children from
     */
    Transforms.removeNodes(editor, {
      at: path,
      match: (n, p) =>
        Path.isParent(path, p) && !Path.equals(p, insertedParagraphPath),
    })
  })
  return true
}
