import { Editor, Element, Node, NodeEntry, Transforms } from "slate"

/**
 * If there is an anchor node inside an anchor node, unwrap the inner anchor
 * node as that is not allowed.
 *
 * Another approach would be to lift the nodes but I think unwrapping the
 * inner one makes more sense. Consider these two scenarios (keeping in mind
 * that they will likely be rare):
 *
 * - User selects text that includes a link. Then user links it. The user would
 *   have a strong expectation that the link just applied would override the
 *   link on the inside.
 *
 * - The opposite: User select text inside an existing link then tries to link
 *   it. That's unusual and while the user may expect that inner selection to
 *   get linked, I think this is a rare enough case whereas the prior one seems
 *   like a slightly more natural one.
 *
 * We could, of course, solve both of these by adding more code paths at the
 * time the link is inserted. That won't change this normalization code and
 * not sure if it is worth the extra complexity.
 */
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
