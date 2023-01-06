import { Editor, Element } from "slate"

/**
 * This method lets other plugins register specific elements by their `type`
 * being able to be toggled with a paragraph.
 *
 * In order for an Element to be toggle compatible, generally it should be a
 * non-void block Element whose direct descendants are `Text` or inline elements
 * like:
 *
 * - headings
 * - list items
 */
export function addConvertElementType(
  editor: Editor,
  type: Element["type"] | Array<Element["type"]>
): void {
  if (Array.isArray(type)) {
    editor.convertElement.convertElementTypes.push(...type)
  } else {
    editor.convertElement.convertElementTypes.push(type)
  }
}
