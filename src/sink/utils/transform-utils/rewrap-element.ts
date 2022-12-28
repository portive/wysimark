import { Editor, Element, NodeEntry, Path, Transforms } from "slate"

import {
  createTargetElement,
  TargetElement,
} from "../standardize-utils/target-element"

/**
 * Takes an existing Element at path `at` and swaps out that Element with a
 * new Element. It does this by unwrapping the Element and rewrapping it with
 * the new Element.
 *
 * This is useful because if we do it this way, we can preserve the selection.
 */
export function rewrapElement<T extends Element = Element>(
  editor: Editor,
  targetElement: TargetElement<T>,
  at: Path
) {
  Editor.withoutNormalizing(editor, () => {
    const originalEntry = Editor.node(editor, at) as NodeEntry<Element>
    const nextElement = createTargetElement(originalEntry[0], targetElement)
    /**
     * Technicall, it's Omit<Element, 'children'> but `wrapNodes` actually
     * accepts that just fine so we override the type.
     */
    Transforms.wrapNodes(editor, nextElement as T, { at })
    Transforms.unwrapNodes(editor, { at: [...at, 0] })
  })
}
