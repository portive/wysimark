import { Element } from "../types"
import { normalizeElementListDepths } from "./normalize/normalizeElementListDepths"
import { serializeElements } from "./serialize-elements"

export function serialize(elements: Element[]): string {
  const normalizedElements = normalizeElementListDepths(elements)
  return serializeElements(normalizedElements)
}
