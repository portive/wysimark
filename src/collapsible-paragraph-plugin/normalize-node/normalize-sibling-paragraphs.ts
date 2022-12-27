import { Editor, Element, NodeEntry, Transforms } from "slate"

import { normalizeSiblings } from "~/src/sink"

import { ParagraphElement } from ".."

function isParagraph(node: Element): node is ParagraphElement {
  return Element.isElement(node) && node.type === "paragraph"
}
/**
 * If there are two sibling paragraphs next to each other and they are both
 * marked as `__collapsible`, this indicates to us that some kind of wall
 * Element was removed.
 *
 * These two collapsible paragraphs should then be merged into one.
 */
export function normalizeSiblingParagraphs(
  editor: Editor,
  entry: NodeEntry<Element>
): boolean {
  return normalizeSiblings(editor, entry, (a, b) => {
    if (!isParagraph(a[0]) || !isParagraph(b[0])) return false
    if (a[0].__collapsible && b[0].__collapsible) {
      Transforms.removeNodes(editor, { at: a[1] })
      return true
    }
    return false
  })
}
