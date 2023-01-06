import { Editor, Element } from "slate"

import { rewrapElement, TargetElement } from "~/src/sink"

/**
 * A type with generic for `setElements` (below) to be used with the curry
 * method. TypeScript, unfortunately, cannot automatically curry generics for
 * us so we have to do it manually.
 */
export type CurriedSetElements = <T extends Element = Element>(
  targetElement: TargetElement<T>
) => void

export function setElements<T extends Element = Element>(
  editor: Editor,
  targetElement: TargetElement<T>
): boolean {
  /**
   * Find convertible elements
   */
  const entries = Array.from(
    Editor.nodes<Element>(editor, {
      match: (node) =>
        Element.isElement(node) && editor.toggleElement.isToggleElement(node),
    })
  )
  /**
   * If there aren't any, don't set
   */
  if (entries.length === 0) return false
  /**
   * If any of the entries aren't the target type, then convert them to the
   * target type.
   */
  Editor.withoutNormalizing(editor, () => {
    for (const entry of entries) {
      rewrapElement(editor, targetElement, entry[1])
    }
  })
  return true
}
