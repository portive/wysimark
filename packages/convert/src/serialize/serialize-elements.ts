import { Element } from "wysimark/src"

import { serializeElement } from "./serialize-element"

export function serializeElements(elements: Element[]): string {
  const segments: string[] = []
  for (const element of elements) {
    segments.push(serializeElement(element))
  }
  /**
   * NOTE:
   *
   * We remove trailing whitespace because we want minimum viable markdown.
   */
  return segments.join("").trim()
}
