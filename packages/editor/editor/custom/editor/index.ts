import { Editor, Transforms } from "slate"
import { ReactEditor } from "slate-react"
/**
 * When we are using a dialog box, Slate loses the selection.
 *
 * This method lets us return focus and select the last known select.
 *
 * If nothing was selected, we default to place the range in the first location.
 */
export function reselect(editor: Editor) {
  function getDefaultRange() {
    const defaultPoint = Editor.start(editor, [0])
    return {
      anchor: defaultPoint,
      focus: defaultPoint,
    }
  }
  ReactEditor.focus(editor)
  Transforms.select(editor, editor.lastSelection ?? getDefaultRange())
}
