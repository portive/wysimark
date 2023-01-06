import { Editor, Element } from "slate"

/**
 * Returns true if the passed in `element` object is an element type that has
 * previously been registered as a convertible element using the
 * `editor.convertElement.addConvertElementType` method.
 */
export function isConvertElement(editor: Editor, element: Element): boolean {
  return editor.convertElement.convertElementTypes.includes(element.type)
}
