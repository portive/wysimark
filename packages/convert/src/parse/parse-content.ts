import type { Content } from "mdast"
import { Element } from "wysimark/src"

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
    case "heading":
      return parseHeading(content)
    case "paragraph":
      return parseParagraph(content)
    case "thematicBreak":
      return parseThematicBreak()
    case "list":
      return parseList(content)
  }
  /**
   * TEMP:
   *
   * This console.log only shows the AST in the case where we haven't handled
   * a content type so this will not pollute our output normally.
   */
  console.log(JSON.stringify(content, null, 2))
  throw new Error(`Unhandled content type ${content.type}`)
}
