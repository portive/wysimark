import { Editor, Element, Node, NodeEntry, Transforms } from "slate"

import { normalizeSiblings } from "~/src/sink"

function isWall(editor: Editor, node: Node) {
  if (!Element.isElement(node)) return false
  return editor.isVoid(node) || editor.isMaster(node)
}

export function normalizeNode(editor: Editor, entry: NodeEntry<Node>): boolean {
  const [node, path] = entry
  if (!Element.isElement(node)) return false
  if (normalizeSiblingWalls(editor, [node, path])) return true
  return false
}

export function normalizeSiblingWalls(
  editor: Editor,
  entry: NodeEntry<Element>
): boolean {
  if (!isWall(editor, entry[0])) return false
  return normalizeSiblings(editor, entry, (a, b) => {
    if (!isWall(editor, a[0]) || !isWall(editor, b[0])) return false
    Transforms.insertNodes(
      editor,
      {
        type: "paragraph",
        __collapsible: true,
        children: [{ text: "" }],
      },
      { at: b[1] }
    )
    return true
  })
}
