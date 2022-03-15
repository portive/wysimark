import { Element, Text } from "slate"

export * from "./ensure-unstyled-line"
export * from "./orphan"
export * from "./empty"
export * from "./children"

/**
 * Returns true if the `Element` provided is empty.
 *
 * NOTE:
 *
 * It does not check for empty `children` and instead checkes for exactly
 * one child with `{text: ""}`.
 *
 * This is because Slate does a pre-normalization check before any normalizers
 * can run, including custom normalizers, that replaces empty children with
 * `[{text: ""}]`.
 */
export function isEmptyElement(element: Element) {
  /**
   * Why we still need this:
   *
   * Slate has one constraint that runs before any of the normalization steps
   * which is to make sure that there are no empty children. If there are,
   * then an empty `Text` is inserted as a single child.
   *
   * HOWEVER, during the normalization stage, it's possible for us to remove
   * all the children and we see true empty children. This would be something
   * that we did, not Slate, and only in the middle of normalization.
   */
  if (element.children.length === 0) return true
  /**
   * There is more than one child so not empty
   */
  if (element.children.length > 1) return false
  const onlyChild = element.children[0]
  /**
   * If it's not a text child, not considered empty
   */
  if (!Text.isText(onlyChild)) return false
  /**
   * If there's any text in it, not empty
   */
  return onlyChild.text === ""
}
