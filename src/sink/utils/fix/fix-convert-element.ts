import { Element } from "slate"

export type ConvertElement<T extends Element = Element> =
  | Omit<T, "children">
  | ((element: Element) => Omit<T, "children">)

export function fixConvertElement<T extends Element>(
  convertElement: ConvertElement<T>
): (element: Element) => Omit<T, "children"> {
  if (typeof convertElement === "function") return convertElement
  return () => ({ ...convertElement } as Omit<T, "children">)
}
