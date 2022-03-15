import { Editor, Element, Path, Transforms } from "slate"
import { isEmptyElement } from "."

/**
 * If the given element is kind of empty (see `isElementKindOfEmpty`) then
 * remove the given `Element`.
 */

export function removeElementIfEmpty(
  editor: Editor,
  element: Element,
  path: Path
): boolean {
  if (!isEmptyElement(element)) return false
  Transforms.removeNodes(editor, { at: path })
  return true
}

/**
 * If an element is empty, wrap it with the provided `defaultElement`
 */
export function wrapElementIfEmpty(
  editor: Editor,
  element: Element,
  path: Path,
  defaultElement: Element
): boolean {
  if (!isEmptyElement(element)) return false
  Transforms.wrapNodes(editor, defaultElement, { at: [...path, 0] })
  return true
}
