import { Editor, Text, Transforms } from "slate"

/**
 * Toggles a mark.
 *
 * Certain marks may not be able to co-exist with another mark. For example,
 * superscript and subscript cannot be applied at the same time. In these
 * cases, you can provide a final argument of `unsetKey` that when the mark
 * is toggled on, the `unsetKey` mark is toggled off automatically. When the
 * mark is toggled off, it will ignore the `unsetKey`
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
