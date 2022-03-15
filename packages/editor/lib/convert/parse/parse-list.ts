import { ListItemElement } from "~/editor/types"
import { Segment } from "~/editor/types"
import { assertUnreachable } from "~/lib/assert-unreachable"
import * as Mdast from "../mdast"
import { parseLine } from "./parse-line"
import { stringifyNode } from "./parse-util"

/**
 * generate a list item element
 */
function generateListItemElement({
  depth,
  ordered,
  checked,
  children,
  index,
}: {
  depth: number
  ordered: boolean
  checked: undefined | boolean
  children: Segment[]
  index: number
}): ListItemElement {
  if (typeof checked === "boolean") {
    return { type: "task-list-item", depth, checked, children }
  } else if (ordered) {
    return { type: "ordered-list-item", depth, children, number: index + 1 }
  } else {
    return { type: "unordered-list-item", depth, children }
  }
}

/**
 * Parse list item.
 *
 * When it has a child list, we increment the depth and then parse it.
 */
function parseListItemOrBlockquote(
  srcBlock: Mdast.ListItem | Mdast.Blockquote,
  { depth, ordered, index }: { depth: number; ordered: boolean; index: number }
): ListItemElement[] {
  const blocks: ListItemElement[] = []
  for (const srcChild of srcBlock.children) {
    switch (srcChild.type) {
      case "paragraph":
      case "heading": {
        const children = srcChild
          ? parseLine(srcChild.children, {})
          : [{ text: "" }]
        blocks.push(
          generateListItemElement({
            depth,
            ordered,
            checked:
              typeof srcBlock.checked === "boolean"
                ? srcBlock.checked
                : undefined,
            children,
            index,
          })
        )
        break
      }
      case "blockquote":
        blocks.push(
          ...parseListItemOrBlockquote(srcChild, { depth, ordered, index })
        )
        break
      case "list":
        blocks.push(...parseListNode(srcChild, { depth: depth + 1 }))
        break
      case "table":
      case "code":
      case "html": {
        const text = stringifyNode(srcChild)
        blocks.push(
          generateListItemElement({
            depth,
            ordered,
            checked:
              typeof srcBlock.checked === "boolean"
                ? srcBlock.checked
                : undefined,
            children: [{ text }],
            index,
          })
        )
        break
      }
      case "thematicBreak":
        /**
         * Ignore a thematic break
         */
        break
      default:
        assertUnreachable(srcChild)
    }
  }
  return blocks
}

/**
 * Parse an Mdast.List and returns an array of list item blocks
 */
export function parseListNode(
  srcBlock: Mdast.List,
  { depth }: { depth: number }
): ListItemElement[] {
  const blocks: ListItemElement[] = []
  srcBlock.children.forEach((childBlock, index) => {
    blocks.push(
      ...parseListItemOrBlockquote(childBlock, {
        depth,
        ordered: !!srcBlock.ordered,
        index,
      })
    )
  })
  return blocks
}
