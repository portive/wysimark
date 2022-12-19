import { Editor, Element, Node, NodeEntry, Transforms } from "slate"

export function normalizeNode(editor: Editor, entry: NodeEntry<Node>): boolean {
  if (!Element.isElement(entry[0])) return false
  if (entry[0].type !== "anchor") return false
  const children = entry[0].children
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    if (!Element.isElement(child) || child.type !== "anchor") continue
    Transforms.unwrapNodes(editor, { at: [...entry[1], i] })
    return true
  }
  return false
}
