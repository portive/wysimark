import { Editor, Element, Node, Transforms } from "slate"
import { CodeLineElement } from "~/editor/types"
import { countLeadingSpaces, isFocusInside } from "~/editor/utils"

export function insertBreakInCodeLine(
  editor: Editor,
  originalInsertBreak: () => void
): boolean {
  /**
   * If it's not in a code-line use default handler
   */

  if (!isFocusInside(editor, "code-line")) return false

  /**
   * Find the code line above
   */

  const aboveEntry = Editor.above<CodeLineElement>(editor, {
    match: (n) => {
      return Element.isElement(n) && n.type === "code-line"
    },
  })

  if (!aboveEntry) return false

  const leadingSpaces = countLeadingSpaces(Node.string(aboveEntry[0]))

  originalInsertBreak()

  /**
   * Insert correct number of spaces
   */
  Transforms.insertText(editor, Array(leadingSpaces).fill(" ").join(""))

  return true
}

export function insertBreak(editor: Editor) {
  const originalInsertBreak = editor.insertBreak

  editor.insertBreak = () => {
    if (insertBreakInCodeLine(editor, originalInsertBreak)) return
    originalInsertBreak()
  }

  return editor
}
