import { Editor, Range, Transforms } from "slate"

export function insertLink(
  editor: Editor,
  href: string,
  text: string = href,
  { select = true }: { select?: boolean } = {}
) {
  const selection = editor.selection || {
    anchor: Editor.start(editor, [0]),
    focus: Editor.start(editor, [0]),
  }
  if (Range.isCollapsed(selection)) {
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
      { select, at: selection }
    )
    /**
     * If select is true then select the inserted link
     */
    if (select && editor.selection) {
      const entry = Editor.node(editor, editor.selection)
      Transforms.select(editor, entry[1])
    }
  } else {
    Transforms.wrapNodes(
      editor,
      { type: "anchor", href, children: [] },
      { split: true }
    )
  }
}
