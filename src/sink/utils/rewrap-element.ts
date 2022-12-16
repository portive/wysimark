import { Editor, Element, NodeEntry, Path, Transforms } from "slate"

/**
 * Takes an existing Element at path `at` and swaps out that Element with a
 * new Element. It does this by unwrapping the Element and rewrapping it with
 * the new Element.
 *
 * This is useful because if we do it this way, we can preserve the selection.
 */
export function rewrapElement(
  editor: Editor,
  convertElement:
    | Omit<Element, "children">
    | ((element: Element) => Omit<Element, "children">),
  at: Path
) {
  Editor.withoutNormalizing(editor, () => {
    const originalEntry = Editor.node(editor, at) as NodeEntry<Element>
    const nextElement =
      typeof convertElement === "function"
        ? convertElement(originalEntry[0])
        : { ...convertElement }
    /**
     * Technicall, it's Omit<Element, 'children'> but `wrapNodes` actually
     * accepts that just fine so we override the type.
     */
    Transforms.wrapNodes(editor, nextElement as Element, { at })
    Transforms.unwrapNodes(editor, { at: [...at, 0] })
  })
}
