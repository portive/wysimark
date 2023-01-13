import type { Paragraph } from "mdast"
import { Element } from "wysimark/src"

import { parsePhrasingContents } from "./parse-phrasing-content"

export function parseParagraph(content: Paragraph): Element[] {
  return [
    {
      type: "paragraph",
      children: parsePhrasingContents(content.children),
    },
  ]
}
