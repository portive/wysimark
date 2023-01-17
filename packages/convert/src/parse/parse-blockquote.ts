import type { Blockquote } from "mdast"
import { Element } from "wysimark/src"

import { parseContents } from "./parse-content"

export function parseBlockquote(content: Blockquote): Element[] {
  return [{ type: "block-quote", children: parseContents(content.children) }]
}
