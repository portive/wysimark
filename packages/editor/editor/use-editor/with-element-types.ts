import { Editor } from "slate"
import { isInlineElement, isVoidElement } from "../types"

export function withElementTypeMethods(editor: Editor): Editor {
  /**
   * Customize isVoid
   */
  editor.isVoid = isVoidElement

  /**
   * Customize isInline
   */
  editor.isInline = isInlineElement

  return editor
}
