import { BlockElement } from "~/editor/types"
import { Part } from "../convert-types"
import { serializeBlockquote } from "./serialize-blockquote"
import { serializeCode } from "./serialize-code"
import { serializeLine } from "./serialize-line"
import { serializeListItem } from "./serialize-list"
import { serializeMedia } from "./serialize-media"
import { serializeTable } from "./serialize-table"
import { token } from "./serialize-utils"

/**
 * Serialize an array of blocks
 */
export function serializeBlocks(blocks: BlockElement[]): Part[] {
  const parts: Part[] = []
  let maxDepth = 0

  for (let i = 0; i < blocks.length; i++) {
    let nextMaxDepth = 0
    const block = blocks[i]

    switch (block.type) {
      case "p":
        parts.push(...serializeLine(block.children), token("\n\n", "\n\n"))
        break
      case "heading":
        parts.push(
          token(`${"#".repeat(block.level)} `, ""),
          ...serializeLine(block.children),
          token("\n\n", "\n\n")
        )
        break
      case "hr":
        parts.push(token("---\n\n", "\n\n"))
        break
      case "code-block":
        parts.push(...serializeCode(block))
        break
      case "media":
        parts.push(serializeMedia(block))
        break
      case "ordered-list-item":
      case "unordered-list-item":
      case "task-list-item": {
        const listItemData = serializeListItem(block, maxDepth)
        parts.push(...listItemData.parts)
        nextMaxDepth = listItemData.depth + 1
        break
      }
      case "table":
        parts.push(...serializeTable(block))
        break
      case "blockquote": {
        const blockquoteParts = serializeBlockquote(block)
        parts.push(...blockquoteParts)
        break
      }
      default:
        throw new Error(`Unhandled block type ${JSON.stringify(block.type)}`)
    }
    maxDepth = nextMaxDepth
  }
  return parts
}
