import { Editor, Element, Node } from "slate"

/**
 * Designed to be used in the `match` option of many Slate methods.
 *
 * The method matches the idea of a leaf Element that contains text content.
 *
 * We think of the concept of a line like a line of text but can also contain
 * inline voids like Emojis for example.
 */
export function matchLineElement(editor: Editor, node: Node): boolean {
  return (
    Element.isElement(node) &&
    Editor.hasInlines(editor, node) &&
    !Editor.isVoid(editor, node)
  )
}
