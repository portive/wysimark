import { Element } from "../types"
import { serializeElement } from "./serialize-element"

export function serializeElements(elements: Element[]): string {
  const segments: string[] = []

  /**
   * The orders array keeps track of the number of ordered list items at each
   * depth. This is used to generate the number for each ordered list item.
   */
  let orders: number[] = []

  for (const element of elements) {
    if (element.type === "ordered-list-item") {
      /**
       * When we're at an ordered list item, we increment the order at the
       * current depth level and we remove any orders at a deeper depth level.
       */
      orders[element.depth] = (orders[element.depth] || 0) + 1
      orders = orders.slice(0, element.depth + 1)
    } else if (
      element.type === "unordered-list-item" ||
      element.type === "task-list-item"
    ) {
      /**
       * When we're at an unordered list item, we slice the orders array to
       * remove any orders at a deeper depth level.
       */
      orders = orders.slice(0, element.depth)
    } else {
      /**
       * When we're at any other element, we reset the orders array because
       * we're no longer in a list.
       */
      orders = []
    }

    segments.push(serializeElement(element, orders))
  }
  /**
   * NOTE:
   *
   * We remove trailing whitespace because we want minimum viable markdown.
   * It also makes it easier to test.
   */
  return segments.join("").trim()
}
