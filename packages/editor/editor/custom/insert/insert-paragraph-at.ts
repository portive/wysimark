import { Editor, Path, Transforms } from "slate"
import { focusAtStart } from ".."

/**
 * Insert a paragraph at the given path, select into it then focus the editor.
 *
 * It's used in:
 *
 * - keydown/handle-key-down-enter-void.ts
 * - render/seamless
 */
export function insertParagraphAt(editor: Editor, path: Path) {
  Transforms.insertNodes(
    editor,
    { type: "p", children: [{ text: "" }] },
    { at: path }
  )
  focusAtStart(editor, path)
}
