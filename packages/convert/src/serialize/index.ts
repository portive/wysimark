import { Element } from "wysimark/src"

import { serializeElements } from "./serialize-elements"

export function serialize(elements: Element[]): string {
  return serializeElements(elements)
}
