import { Editor } from "slate"
import { EditorEvent } from "../types/editor-event"

/**
 * Used to create an Editor Event for the `onChange` callback
 */
export function getEditorEvent(editor: Editor): EditorEvent {
  return {
    getEditor() {
      return editor
    },
    getMarkdown() {
      return editor.getMarkdown()
    },
    getData() {
      return {
        markdown: editor.getMarkdown(),
      }
    },
  }
}
