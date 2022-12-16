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
  const entries = Array.from(
    Editor.nodes<Element>(editor, {
      match: (node) => Element.isElement(node) && editor.isConvertible(node),
    })
  )
  if (entries.length === 0) return false
  if (entries.every((entry) => match(entry[0]))) {
    Editor.withoutNormalizing(editor, () => {
      for (const entry of entries) {
        rewrapElement(editor, { type: "paragraph" }, entry[1])
      }
    })
  } else {
    Editor.withoutNormalizing(editor, () => {
      for (const entry of entries) {
        rewrapElement(editor, convertElement, entry[1])
      }
    })
  }
  return true
}
