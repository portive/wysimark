import { Editor, Element } from "slate"

/**
 * Returns true if the passed in `element` object is an element type that has
 * previously been registered as a toggle element using the
 * `editor.toggleElement.addToggleElementType` method.
 */
export function isToggleElement(editor: Editor, element: Element): boolean {
  return editor.toggleElement.toggleElementTypes.includes(element.type)
}
