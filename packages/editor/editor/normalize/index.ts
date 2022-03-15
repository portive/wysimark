import { Editor, Element, Text } from "slate"
import { assertUnreachable } from "~/lib/assert-unreachable"
import { normalizeBlockquote } from "./blockquote/normalize-blockquote"
import { normalizeCodeBlock } from "./code/normalize-code-block"
import { normalizeCodeLine } from "./code/normalize-code-line"
import { normalizeEditor } from "./editor/normalize-editor"
import { normalizeLink } from "./inline/normalize-link"
import { normalizeListItem } from "./list/normalize-list-item"
import { normalizeTable } from "./table/normalize-table"
import { normalizeTableCell } from "./table/normalize-table-cell"
import { normalizeTableRow } from "./table/normalize-table-row"

/**
 * Add normalization to the Editor
 */

export function withNormalize(editor: Editor) {
  const { normalizeNode: originalNormalizeNode } = editor

  /**
   * Set the initial value of `reorderedLists` so it doesn't start as
   * `undefined` which would break list normalization as it expects it to be
   * an `object`
   */

  editor.reorderedLists = {}

  /**
   * NOTE:
   *
   * Why not use `NodeEntry`?
   *
   * Considered passing a `NodeEntry` around but it tends to make type
   * narrowing more challenging as TypeScript doesn't do type narrowing
   * automatically for tuples with an object in it.
   */
  editor.normalizeNode = ([node, path]) => {
    /**
     * This is an optimized path through normalizing all the Node types.
     *
     * If we know it's not an Element, we don't have to do the individual
     * Element checks.
     */

    if (Element.isElement(node)) {
      /**
       * Normalize Element with option to short-circuit return
       */

      switch (node.type) {
        /**
         * Normalize Inline
         */
        case "link":
          if (normalizeLink(editor, node, path)) return
          break
        /**
         * Normalize Code Block
         */
        case "code-line":
          if (normalizeCodeLine(editor, node, path)) return
          break
        case "code-block":
          if (normalizeCodeBlock(editor, node, path)) return
          break
        /**
         * Normalize Table
         */
        case "td":
          if (normalizeTableCell(editor, node, path)) return
          break
        case "tr":
          if (normalizeTableRow(editor, node, path)) return
          break
        case "table":
          if (normalizeTable(editor, node, path)) return
          break
        /**
         * Normalize List items
         */
        case "ordered-list-item":
        case "unordered-list-item":
        case "task-list-item":
          if (normalizeListItem(editor, node, path)) return
          break
        /**
         * Normalize block quote
         */
        case "blockquote":
          if (normalizeBlockquote(editor, node, path)) return
          break
        /**
         * Flush elements don't need normalizing
         *
         * Void elements don't need normalizing
         */
        case "p":
        case "heading":
        case "hr":
        case "media":
          break

        default:
          assertUnreachable(node)
      }
    } else if (Editor.isEditor(node)) {
      /**
       * The last item normalized is always the top level `Editor` object and
       * we use this fact to reset the `reorderedList` after normalization.
       */

      editor.reorderedLists = {}

      /**
       * Normalize Editor and ensure it ends in a `ConvertibleElement`
       */

      if (normalizeEditor(node)) return
    } else if (Text.isText(node)) {
      /**
       * For the exhaustiveness check
       */
    } else {
      assertUnreachable(node)
    }
    originalNormalizeNode([node, path])
  }
  return editor
}
