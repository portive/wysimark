import type { Content, HTML, Link } from "mdast"
import { Element } from "wysimark/src"

import { assertUnreachable } from "../utils"
import { parseCodeBlock } from "./parse-code-block"
import { parseHeading } from "./parse-heading"
import { parseList } from "./parse-list"
import { parseParagraph } from "./parse-paragraph"
import { parseThematicBreak } from "./parse-thematic-break"

export function parseContents(contents: Content[]): Element[] {
  const elements: Element[] = []
  for (const content of contents) {
    elements.push(...parseContent(content))
  }
  return elements
}

export function parseContent(content: Content): Element[] {
  switch (content.type) {
    case "code":
      return parseCodeBlock(content)
    case "heading":
      return parseHeading(content)
    case "html":
      return parseHTML(content)
    case "paragraph":
      return parseParagraph(content)
    case "thematicBreak":
      return parseThematicBreak()
    case "list":
      return parseList(content)
    case "listItem":
      throw new Error(`Expected listItem to only appear as child of list`)
  }
  assertUnreachable(content)
}

function parseHTML(content: HTML): Element[] {
  return [
    {
      type: "code-block",
      language: "html",
      children: content.value.split("\n").map((line) => ({
        type: "code-block-line",
        children: [{ text: line }],
      })),
    },
  ]
}
