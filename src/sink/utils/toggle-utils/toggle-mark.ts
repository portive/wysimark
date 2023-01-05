import { Editor, Text, Transforms } from "slate"

/**
 * Toggles a mark
 */
export function toggleMark(
  editor: Editor,
  markKey: keyof Text,
  unsetKey?: keyof Text
) {
  const [match] = Editor.nodes(editor, {
    match: (n) => Text.isText(n) && !!n[markKey],
  })
  Transforms.setNodes(
    editor,
    { [markKey]: !match || null },
    {
      match: (n) => Text.isText(n),
      split: true,
    }
  )
  if (typeof unsetKey === "string") {
    Transforms.unsetNodes(editor, unsetKey, {
      match: (n) => Text.isText(n),
      split: true,
    })
  }
}
