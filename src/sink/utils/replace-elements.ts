import { Editor, Element, Path, Range, Transforms } from "slate"

/**
 * This method is a bulk element replace method. Anywhere in the given `at`
 * location it looks for anything that matches the `blockMatcher` which spits
 * out an `Element`. It converts the matched `Element` into that different
 * `Element`.
 */
export function replaceElements(
  editor: Editor,
  blockMatcher: (element: Element) => Element | null,
  at: Path | Range | null = editor.selection
) {
  if (at == null) return
  const nodeEntries = Editor.nodes<Element>(editor, {
    at,
    match: (n) => !!(Element.isElement(n) && blockMatcher(n)),
  })
  for (const [node, pos] of nodeEntries) {
    const nextElement = blockMatcher(node)
    if (nextElement === null)
      throw new Error(
        `This should not be null at this point because of code above`
      )
    /**
     * Figure out what keys are in the old Element that aren't in the new
     * Element. Those need to be deleted except for `children`
     */
    const keysToUnset = new Set(Object.keys(node))
    for (const key of Object.keys(nextElement)) {
      keysToUnset.delete(key)
    }
    /**
     * We typecast here because the type failure is because we can get leftover
     * properties that make it fail the matching to an Element. We fix that
     * in the next line by unsetting all those leftover properties.
     */
    Transforms.setNodes(editor, nextElement as Partial<Element>, { at: pos })
    Transforms.unsetNodes(editor, [...keysToUnset], { at: pos })
  }
}
