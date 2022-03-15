import { Editor, Path } from "slate"
import { removeElementIfEmpty } from "~/editor/normalize/util"
import { BlockquoteElement } from "../../types"

/**
 * A LinkElement cannot exist without any text. Once we remove the last
 * character, we remove the link.
 */

export function normalizeBlockquote(
  editor: Editor,
  element: BlockquoteElement,
  path: Path
): boolean {
  /**
   * INVALID PARENT:
   *
   * n/a
   *
   * Blockquotes are valid at the root so we don't want to do any normalization.
   */

  /**
   * EMPTY CHILDREN:
   *
   * If a blockquote is empty, remove it.
   */
  removeElementIfEmpty(editor, element, path)

  /**
   * INVALID CHILDREN:
   *
   * n/a
   *
   * Can hold anything that the root element can include a `blockquote`
   */

  /**
   * PROPS:
   *
   * n/a
   *
   * No props
   */

  return false
}
