import { Editor, Transforms } from "slate"

export function insertLink(
  editor: Editor,
  href: string,
  text: string = href,
  { select = true }: { select?: boolean } = {}
) {
  /**
   * Insert the node and select it if select is true
   */
  Transforms.insertNodes(
    editor,
    {
      type: "anchor",
      href,
      children: [{ text }],
    },
    { select }
  )
  /**
   * If select is true then select the inserted link
   */
  if (select && editor.selection) {
    const entry = Editor.node(editor, editor.selection)
    Transforms.select(editor, entry[1])
  }
}
