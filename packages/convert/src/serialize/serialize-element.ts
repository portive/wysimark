import { Element } from "wysimark/src"
import {
  CodeBlockElement,
  CodeBlockLineElement,
} from "wysimark/src/code-block-plugin"

import { Segment } from "../types"
import { assertUnreachable } from "../utils"
import { serializeCodeBlock } from "./serialize-code-block"
import { serializeLine } from "./serialize-line"

export function serializeElement(element: Element) {
  switch (element.type) {
    case "heading":
      return `${"#".repeat(element.level)} ${serializeLine(
        element.children as Segment[]
      )}\n\n`
    case "paragraph":
      return `${serializeLine(element.children as Segment[])}\n\n`
    case "anchor":
      return `[${serializeLine(element.children as Segment[])}](${
        element.href
      })`
    case "horizontal-rule":
      return "---\n\n"
    case "code-block":
      return serializeCodeBlock(element)
    case "code-block-line":
      throw new Error(
        `code-block-line should only be present as child of code-block`
      )
  }
  assertUnreachable(element)
}
