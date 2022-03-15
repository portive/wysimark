import range from "lodash/range"
import { ListItemElement } from "~/editor/types"
import { Part } from "../convert-types"
import { serializeLine } from "./serialize-line"
import { token } from "./serialize-utils"

/**
 * serialize the token that comes before a list item based on its checked
 * value.
 */
function serializeListItemToken(depth: number, block: ListItemElement) {
  const indent = range(depth)
    .map(() => "  ")
    .join("")
  switch (block.type) {
    case "ordered-list-item":
      return token(`${indent}1. `, "1. ")
    case "unordered-list-item":
      return token(`${indent}- `, "* ")
    case "task-list-item":
      if (block.checked) {
        return token(`${indent}- [x] `, "[x] ")
      } else {
        return token(`${indent}- [ ] `, "[ ] ")
      }
    // case true:
    //   return token(`${indent}- [x] `, "[x] ")
    // case false:
    //   return token(`${indent}- [ ] `, "[ ] ")
    // default:
    //   return token(`${indent}- `, "* ")
  }
}

/**
 * serialize list item
 */
export function serializeListItem(
  block: ListItemElement,
  maxDepth: number
): { depth: number; parts: Part[] } {
  /**
   * When we serialize, markdown doesn't recognize when we skip a depth level.
   *
   * Critically, if we start at a depth of 2 or greater (4 spaces) the line
   * is interpreted as a code block and really messes things up.
   *
   * The logic around `maxDepth` is that the first list item must always be
   * of depth 0 and any subsequent list items can only ever be a maximum
   * depth of 1 more than the previous one.
   *
   * Any way we do it, we aren't respecting the user's wishes. This takes the
   * minimally invasive method (which is also the least amount of code).
   */
  const depth = Math.min(maxDepth, block.depth)
  const prefixToken = serializeListItemToken(depth, block)
  const parts = [
    prefixToken,
    ...serializeLine(block.children, [], true),
    token("\n\n", "\n\n"),
  ]
  return { depth, parts }
}
