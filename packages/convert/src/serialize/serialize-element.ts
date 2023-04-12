import { Element, Segment } from "../types"
import { assertUnreachable } from "../utils"
import { serializeCodeBlock } from "./serialize-code-block"
import { serializeElements } from "./serialize-elements"
import { serializeImageBlock } from "./serialize-image-block"
import { serializeLine } from "./serialize-line"
import { serializeTable } from "./serialize-table"

const LIST_INDENT_SIZE = 4

export function serializeElement(element: Element, orders: number[]): string {
  switch (element.type) {
    case "anchor":
      return `[${serializeLine(element.children as Segment[])}](${
        element.href
      })`
    case "block-quote": {
      const lines = serializeElements(element.children as Element[])
      return `${lines
        .split("\n")
        .map((line) => `> ${line}`.trim())
        .join("\n")}\n\n`
    }
    case "code-block":
      return serializeCodeBlock(element)
    case "code-block-line":
      throw new Error(
        `code-block-line should only be present as child of code-block`
      )
    case "heading":
      return `${"#".repeat(element.level)} ${serializeLine(
        element.children as Segment[]
      )}\n\n`
    case "horizontal-rule":
      return "---\n\n"
    case "paragraph":
      return `${serializeLine(element.children as Segment[])}\n\n`
    /**
     * Table
     */
    case "table":
      return serializeTable(element)
    case "table-row":
    case "table-cell":
    case "table-content":
      throw new Error(
        `Table elements should only be present as children of table which should be handled by serializeTable. Got ${element.type} may indicate an error in normalization.`
      )
    /**
     * List
     */
    case "unordered-list-item": {
      const indent = " ".repeat(element.depth * LIST_INDENT_SIZE)
      return `${indent}- ${serializeLine(element.children as Segment[])}\n\n`
    }
    case "ordered-list-item": {
      const indent = " ".repeat(element.depth * LIST_INDENT_SIZE)
      return `${indent}${orders[element.depth]}. ${serializeLine(
        element.children as Segment[]
      )}\n\n`
    }
    case "task-list-item": {
      const indent = " ".repeat(element.depth * LIST_INDENT_SIZE)
      return `${indent}- [${element.checked ? "x" : " "}] ${serializeLine(
        element.children as Segment[]
      )}\n\n`
    }
    /**
     * TODO: Handle upload attachments.
     */
    case "upload-attachment":
      throw new Error(`Upload attachments not yet supported.`)
    /**
     * TODO: Handle image elements.
     */
    case "image-block":
      return serializeImageBlock(element)
    case "image-inline":
      throw new Error(`Image elements not yet supported.`)
  }
  assertUnreachable(element)
}
