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
  const joined = segments.join("") //.trim()

  /**
   * If there is no content return an empty string for the Markdown.
   */
  if (joined.trim() === "") return ""

  /**
   * The following code replaces consecutive newlines with a single newline
   * with a bit of additional logic to handle newlines at the beginning.
   */
  return replaceConsecutiveNewlines(replaceLeadingNewlines(joined)).trim()
}

/**
 * Replace two leading newlines with a non-breaking space to indicate a
 * paragraph that won't be collapsed.
 */
function replaceLeadingNewlines(input: string): string {
  return input.replace(/^\n\n/g, "&nbsp;\n\n")
}

/**
 * In the rest of the Markdown, replace four or more consecutive newlines with
 * non-breaking spaces and newlines to indicate a paragraph that won't be
 * collapsed.
 */
function replaceConsecutiveNewlines(input: string): string {
  return input.replace(/(\n{4,})/g, (match) => {
    const newlineCount = match.length
    const count = Math.floor((newlineCount - 2) / 2)
    return "\n\n" + Array(count).fill("&nbsp;").join("\n\n") + "\n\n"
  })
}
