import { Element } from "slate"

/**
 * The TargetElement can be specified either as the actual value or as a
 * function that takes a srcElement and returns the targetElement.
 */
export type TargetElement<T extends Element = Element> =
  | Omit<T, "children">
  | ((srcElement: Element) => Omit<T, "children">)

/**
 * TODO:
 *
 * This should probably just be moved into the `rewrapElement` function page
 * since it is not used outside of it. Originally, this may have served a
 * dual purpose but currently it seems like it only exists for the use of
 * `rewrapElement`.
 */

/**
 * This function takes a `srcElement` and the idea is that we convert it into
 * some other type of element, which is the `targetElement`.
 *
 * The `TargetElement` can be specified either as:
 *
 * - an actual `Element` but without the `children`. This is because we are
 *   converting the `srcElement` to the `targetElement` and the `targetElement`
 *   will take on the `children` of the `srcElement`
 *
 * - A function that takes the `srcElement` and returns the `targetElement`
 *   without the `children`. This form of `TargetElement` can be useful in
 *   cases where we want to retain some of the properties of the `srcElement`.
 *   An example of this is a list item where we convert from a bullet to a
 *   numbered item. We would like to keep the `depth` information if it exists
 *   in this scenario.
 */
export function createTargetElement<T extends Element>(
  srcElement: Element,
  targetElement: TargetElement<T>
) {
  if (typeof targetElement !== "function") return targetElement
  return targetElement(srcElement)
}
