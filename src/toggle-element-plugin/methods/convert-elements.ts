import { Editor, Element } from "slate"

import { rewrapElement, TargetElement } from "~/src/sink"

/**
 * A type with generic for `convertElements` (below) to be used with the curry
 * method. TypeScript, unfortunately, cannot automatically curry generics for
 * us so we have to do it manually.
 */
export type CurriedConvertElements = <T extends Element = Element>(
  matchForToggle: (element: Element) => boolean,
  targetElement: TargetElement<T>,
  allowToggle: boolean
) => void

/**
 * The `convertElements` takes a Block Element that has been identified as being
 * convertible and converts it into another type of Element.
 *
 * For example:
 *
 * - headings
 * - list items
 *
 * It also allows for toggling. In this scenario, if all the convertible
 * elements are already in the target state (e.g. we are converting to a heading
 * 2 and all the convertible elemtns are already a heading 2) then the elements
 * will convert back to a `paragraph` element.
 *
 * NOTE:
 *
 * Why is there an unusual signature?
 *
 * This method has a somewhat unusual and not-DRY signature which is in the form
 * of having a `matchForToggle` (which allows us to specify when an Element is
 * already matching the `targetElement`) and also an `allowToggle`; however, we
 * could make `matchForToggle` optional and only `allowToggle` if it is
 * specified.
 *
 * That being said, the signature is set up this way to reduce friction when
 * creating a specific convert function like `convertHeading`. In this scenario,
 * we can have the created `convertHeading` pass through the argument to
 * `allowToggle` and pass it through to this `convertElements` function making
 * that code easier to understand.
 */
export function convertElements<T extends Element = Element>(
  editor: Editor,
  matchForToggle: (element: Element) => boolean,
  targetElement: TargetElement<T>,
  allowToggle: boolean
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
   * If there aren't any convertible elements, there's nothing to do
   */
  if (entries.length === 0) return false

  /**
   * If `allowToggle` is `true` and all of the convertible elements match the
   * `matchForToggle` (for example, if converting to a heading level 2, if all
   * the matching convertible elements are heading level 2) then we want to
   * toggle back to a paragraph.
   */
  const shouldToggle =
    allowToggle && entries.every((entry) => matchForToggle(entry[0]))

  if (shouldToggle) {
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
        rewrapElement(editor, targetElement, entry[1])
      }
    })
  }
  return true
}
