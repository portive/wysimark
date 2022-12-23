import { Editor, Element, Node, NodeEntry, Transforms } from "slate"

import { normalizeSiblings } from "~/src/sink"

import { ParagraphElement } from ".."
import { normalizeSiblingWalls } from "./normalize-sibling-walls"

export function normalizeNode(editor: Editor, entry: NodeEntry<Node>): boolean {
  const [node, path] = entry
  if (!Element.isElement(node)) return false
  if (normalizeSiblingWalls(editor, [node, path])) return true
  if (normalizeSiblingParagraphs(editor, [node, path])) return true
  return false
}

/**
 * TODO:
 * FIXME:
 *
 * In order to make this normalization work, we must first enable a plugin
 * that we haven't created that I'm going to call `better-delete-plugin` which
 * will do two things
 *
 * - Execute a normalzation pass when a backspace or delete happens.
 */

function isParagraph(node: Element): node is ParagraphElement {
  return Element.isElement(node) && node.type === "paragraph"
}

function normalizeSiblingParagraphs(
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
