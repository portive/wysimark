import type { Heading } from "mdast"
import { Element } from "wysimark/src"

import { parsePhrasingContents } from "./parse-phrasing-content"

export function parseHeading(content: Heading): Element[] {
  return [
    {
      type: "heading",
      level: content.depth,
      children: parsePhrasingContents(content.children),
    },
  ]
}
