import { TableElement, TdElement, TrElement } from "~/editor/types"
import { Part } from "../convert-types"
import { serializeLine } from "./serialize-line"
import { token } from "./serialize-utils"

/**
 * Serialize table row
 */
function serializeTr(tr: TrElement): Part[] {
  const parts: Part[] = []
  tr.children.forEach((cell: TdElement, index) => {
    if (cell.children.length !== 1)
      throw new Error(
        `Expected td to have exactly one child which should be a paragraph`
      )
    const paragraphChildren = cell.children[0].children
    parts.push(...serializeLine(paragraphChildren))
    const isLast = index === tr.children.length - 1
    if (isLast) {
      parts.push(token("|", " |"))
    } else {
      parts.push(token("|", " | "))
    }
  })
  return [token("|", "| "), ...parts, token("\n", "\n")]
}

/**
 * Serialize table
 */
export function serializeTable(block: TableElement): Part[] {
  const parts: Part[] = []
  const firstChild = block.children[0]
  const headRowParts = serializeTr(firstChild)
  const headDividerMarkdown = `|${block.columns
    .map((column) => {
      switch (column.align) {
        case "left":
          return ":-"
        case "right":
          return "-:"
        case "center":
          return ":-:"
      }
    })
    .join("|")}|\n`
  parts.push(...headRowParts, token(headDividerMarkdown, ""))
  block.children.slice(1).forEach((tr) => {
    parts.push(...serializeTr(tr))
  })
  parts.push(token("\n", "\n"))
  return parts
}
