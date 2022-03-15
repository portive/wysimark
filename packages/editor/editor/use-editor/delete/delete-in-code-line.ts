import { Editor, Element, Transforms } from "slate"
import { isEmptyElement } from "~/editor/normalize/util"
import { CodeBlockElement, CodeLineElement } from "~/editor/types"

/**
 * If we are in an empty `code-line` that is the last `code-line` in a
 * `code-block`, when we delete, remove the entire `code-block`.
 */

export function deleteInCodeLine(editor: Editor): boolean {
  /**
   * Check if we are in an empty `code-line`
   */
  const codeLineEntry = Editor.above<CodeLineElement>(editor, {
    match: (n) => Element.isElement(n) && n.type === "code-line",
  })
  if (codeLineEntry == null) return false
  if (!isEmptyElement(codeLineEntry[0])) return false
  /**
   * Check if we are in the last `code-line` of a `code-block`
   */
  const codeBlockEntry = Editor.above<CodeBlockElement>(editor, {
    match: (n) => Element.isElement(n) && n.type === "code-block",
  })
  if (codeBlockEntry == null) return false
  if (codeBlockEntry[0].children.length > 1) return false
  /**
   * If we are in the only remaining `code-line` and it is empty, remove
   * the `code-block`.
   */
  Transforms.removeNodes(editor, { at: codeBlockEntry[1] })
  return true
}
