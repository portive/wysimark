import { Editor, Element, Node, NodeEntry, Transforms } from "slate"

import { createIsElementType, normalizeSiblings } from "~/src/sink"

import { OrderedListItemElement } from ".."

const isOrderedListItem = createIsElementType<OrderedListItemElement>([
  "ordered-list-item",
])

/**
 * Makes sure that when a list item is deeper than a preceding one, that we
 * reset the counter.
 *
 * How it works:
 *
 * If we have any two list item siblings where the second sibling is an
 * `ordered-list-item`, then the second sibling should have the property
 * `_firstOfType` be `true` if the depth of the second sibling is higher or
 * the previous sibling is not an ordered list item (e.g. a paragraph or a
 * bullet)
 *
 * Why we need it:
 *
 * We need to do this manually because our implementation of lists does not
 * actually nest lists within lists. We took the approach because the cost
 * of actually nesting lists is very high in terms of added complexity. It is
 * much easier to manually reset the counters than it is to implement
 * everything to W3C specifications, especially given that from a UI
 * perspective, users expect lists to behave similar to paragraphs and
 * headings.
 */

export function normalizeOrderedFirstAtDepth(
  editor: Editor,
  entry: NodeEntry<Node>
): boolean {
  const [node, path] = entry
  if (!Element.isElement(node)) return false
  return normalizeSiblings<Element>(editor, [node, path], (a, b) => {
    /**
     * If the second item (the item we are actually looking at) is not an
     * ordered list item, then we aren't interested.
     */
    if (!isOrderedListItem(b[0])) return false
    /**
     * The second item is an ordered-list-item. If the item before it is not
     * or the second item is deeper than the first, then we want to set
     * `__firstAtDepth` to `true`.
     */
    const __firstAtDepth = !isOrderedListItem(a[0]) || b[0].depth > a[0].depth
    /**
     * Check if the setting is already correct.
     */
    if (b[0].__firstAtDepth !== __firstAtDepth) {
      Transforms.setNodes(editor, { __firstAtDepth }, { at: b[1] })
      return true
    }
    return false
  })
}
