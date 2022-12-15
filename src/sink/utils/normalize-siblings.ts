import { Editor, Node, NodeEntry } from "slate"

export function normalizeSiblings<T extends Node>(
  editor: Editor,
  entry: NodeEntry<T>,
  transform: (a: NodeEntry, b: NodeEntry) => boolean
) {
  const [, path] = entry

  const prevEntry = Editor.previous(editor, { at: path })
  if (prevEntry && transform(prevEntry, entry)) return true

  const nextEntry = Editor.next(editor, { at: path })
  if (nextEntry && transform(entry, nextEntry)) return true

  return false
}
