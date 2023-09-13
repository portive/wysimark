import { Editor, Location, Text, Transforms } from "slate"

/**
 * Toggles a mark.
 *
 * Certain marks may not be able to co-exist with another mark. For example,
 * superscript and subscript cannot be applied at the same time. In these
 * cases, you can provide a final argument of `unsetKey` that when the mark
 * is toggled on, the `unsetKey` mark is toggled off automatically. When the
 * mark is toggled off, it will ignore the `unsetKey`
 */

export function removeMarks(
  editor: Editor,
  { at = editor.selection }: { at?: Location | null } = {}
) {
  if (at == null) return
  const nodeEntries = [
    ...Editor.nodes(editor, {
      match: (n) => Text.isText(n),
      at,
    }),
  ]
  const setter: Record<string, null> = {}
  for (const [node] of nodeEntries) {
    for (const key of Object.keys(node)) {
      if (key === "text") continue
      setter[key] = null
    }
  }
  Transforms.setNodes(editor, setter, {
    match: (n) => Text.isText(n),
    split: true,
    at,
  })
}
