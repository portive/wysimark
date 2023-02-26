import { Element } from "wysimark/src"

import { serializeElement } from "./serialize-element"

export function serializeElements(elements: Element[]): string {
  const segments: string[] = []

  /**
   * The orders array keeps track of the number of ordered list items at each
   * depth. This is used to generate the number for each ordered list item.
   */
  let orders: number[] = []
  for (const element of elements) {
    /**
     * TODO:
     *
     * This logic isn't correct yet except for in the simplest of cases.
     * Namely, we have to reset the orders above the current depth level all
     * the time by deleting them.
     */
    if (element.type === "ordered-list-item") {
      orders[element.depth] = (orders[element.depth] || 0) + 1
    } else if (
      element.type === "unordered-list-item" ||
      element.type === "task-list-item"
    ) {
      /**
       * TODO:
       *
       * Check to make sure this logic is correct. I haven't tested it yet.
       */
      orders = orders.slice(0, element.depth)
    } else {
      /**
       * When we've switched to another element type, we can reset the orders
       * at every depth level.
       */
      orders = []
    }
    segments.push(serializeElement(element, orders))
  }
  /**
   * NOTE:
   *
   * We remove trailing whitespace because we want minimum viable markdown.
   */
  return segments.join("").trim()
}
