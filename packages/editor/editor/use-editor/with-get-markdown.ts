import { Editor } from "slate"
import { serialize } from "~/lib/convert/serialize"
export function withGetMarkdown(editor: Editor): Editor {
  /**
   * Add `editor.getMarkdown` method which takes the current value of the
   * editor and converts it to markdown and returns it.
   */
  editor.getMarkdown = () => {
    const { markdown } = serialize(editor.children)
    return markdown
  }

  return editor
}
