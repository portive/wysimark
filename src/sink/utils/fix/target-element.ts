import { Element } from "slate"

export type TargetElement<T extends Element = Element> =
  | Omit<T, "children">
  | ((element: Element) => Omit<T, "children">)

export function createTargetElement<T extends Element>(
  srcElement: Element,
  targetElement: TargetElement<T>
) {
  if (typeof targetElement !== "function") return targetElement
  return targetElement(srcElement)
}
