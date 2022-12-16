import { Editor, Element } from "slate"

import { rewrapElement } from "./rewrap-element"

/**
 * Toggle convertible elements to a targetElement like headings and list items.
 *
 * Looks for `editor.isConvertible` elements to toggle.
 *
 * If it doesn't find any, returns false.
 *
 * If it does find them, then it looks to see if all the entries already `match`
 * the target of the toggle (like a heading with level 3). If they all match,
 * then we toggle back to a paragraph.
 *
 * If not every one matches, then we toggle to the `targetElement`. To make this
 * method more flexibl
 */
export function toggle<T extends Element>(
  editor: Editor,
  match: (element: Element) => boolean,
  convertElement:
    | Omit<T, "children">
    | ((element: Element) => Omit<T, "children">)
) {
  /**
   * Find convertible elements
   */
  const entries = Array.from(
    Editor.nodes<Element>(editor, {
      match: (node) => Element.isElement(node) && editor.isConvertible(node),
    })
  )
  /**
   * If there aren't any, don't toggle
   */
  if (entries.length === 0) return false
  if (entries.every((entry) => match(entry[0]))) {
    /**
     * If all of the entries are already the target type, then revert them to
     * a paragraph
     */
    Editor.withoutNormalizing(editor, () => {
      for (const entry of entries) {
        rewrapElement(editor, { type: "paragraph" }, entry[1])
      }
    })
  } else {
    /**
     * If any of the entries aren't the target type, then convert them to the
     * target type.
     */
    Editor.withoutNormalizing(editor, () => {
      for (const entry of entries) {
        rewrapElement(editor, convertElement, entry[1])
      }
    })
  }
  return true
}
