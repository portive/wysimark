import { Descendant, Editor, Node, NodeEntry } from "slate"

export function normalizeSiblings<T extends Descendant>(
  editor: Editor,
  entry: NodeEntry<T>,
  transform: (a: NodeEntry<T>, b: NodeEntry<T>) => boolean
): boolean {
  const [, path] = entry

  const prevEntry = Editor.previous<T>(editor, { at: path })
  if (prevEntry && transform(prevEntry, entry)) return true

  const nextEntry = Editor.next<T>(editor, { at: path })
  if (nextEntry && transform(entry, nextEntry)) return true

  return false
}
