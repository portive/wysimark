import { Editor, Path, Transforms } from "slate"
import { ReactEditor } from "slate-react"

/**
 * Selects at the given path which can be a Node and not a Text.
 *
 * We make sure that we select the first text node by using Editor.start so
 * as not to throw errors.
 *
 * We then make the editor get the focus. This is useful if the user clicked
 * a user interface element and the editor did not yet have the focus at the
 * time the UI element was clicked.
 *
 * If you don't want to give the editor focus, use `selectAt` instead.
 */
export function focusAtStart(editor: Editor, path: Path) {
  selectAtStart(editor, path)
  ReactEditor.focus(editor)
}

export function focusAtEnd(editor: Editor, path: Path) {
  selectAtEnd(editor, path)
  ReactEditor.focus(editor)
}

/**
 * Selects at the given path which can be a Node and not a Text.
 *
 * We make sure that we select the first text node by using Editor.start so
 * as not to throw errors.
 *
 * This does not force the Editor to get the focus. For that, use `focusAt`
 */
export function selectAtStart(editor: Editor, path: Path) {
  Transforms.select(editor, Editor.start(editor, path))
}

export function selectAtEnd(editor: Editor, path: Path) {
  Transforms.select(editor, Editor.end(editor, path))
}
