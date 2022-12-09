import { Editor, Path, Transforms } from "slate"

/**
 * Puts the selection at the start of a Node at the given path.
 */
export function selectStartOfElement(editor: Editor, path: Path) {
  Transforms.select(editor, Editor.start(editor, path))
}
