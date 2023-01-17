import { Element } from "wysimark/src"

import { Segment } from "../types"
import { assertUnreachable } from "../utils"
import { serializeCodeBlock } from "./serialize-code-block"
import { serializeElements } from "./serialize-elements"
import { serializeLine } from "./serialize-line"
import { serializeTable } from "./serialize-table"

export function serializeElement(element: Element): string {
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
    case "table":
      return serializeTable(element)
  }
  assertUnreachable(element)
}
