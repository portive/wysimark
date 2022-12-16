import { Editor, Node, NodeMatch, Transforms } from "slate"

export function transformNodes<T extends Node>(
  editor: Editor,
  {
    match,
    convert,
  }: { match: NodeMatch<T>; convert: (node: T) => Record<string, unknown> }
) {
  const entries = Array.from(Editor.nodes<T>(editor, { match }))
  if (entries.length === 0) return false
  for (const entry of entries) {
    const [node] = entry
    Transforms.setNodes(editor, convert(node), { at: entry[1] })
  }
  return true
}
