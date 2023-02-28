import type { Paragraph } from "mdast"

import { Element } from "../types"
import { parsePhrasingContents } from "./parse-phrasing-content/parse-phrasing-content"

export function parseParagraph(content: Paragraph): Element[] {
  const segments = parsePhrasingContents(content.children)
  return [
    {
      type: "paragraph",
      children: segments,
    },
  ]
}
