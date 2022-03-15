import { Editor, Path } from "slate"
import { CodeLineElement } from "~/editor/types"
import { convertOrphanToParagraph, ensureUnstyledLine } from "../util"

/**
 * A LinkElement cannot exist without any text. Once we remove the last
 * character, we remove the link.
 */
export function normalizeCodeLine(
  editor: Editor,
  element: CodeLineElement,
  path: Path
): boolean {
  /**
   * EMPTY CHILDREN:
   *
   * Do nothing because it will always be at least an empty `Text` node.
   */
  /**
   * INVALID CHILDREN:
   *
   * Ensure code line contain only unstyled text
   */
  if (ensureUnstyledLine(editor, element, path)) return true
  /**
   * INVALID PARENT:
   *
   * Convert `code-line` without a parent `code-block` to a paragraph
   */
  if (convertOrphanToParagraph(editor, element, path, "code-block")) return true
  return false
}
