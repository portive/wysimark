// import { Root } from "remark-parse/lib"
import type { Root } from "mdast"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import { unified } from "unified"

import { parseContents } from "./parse-content"

/**
 * Takes a Markdown string as input and returns a remarkParse AST
 */
export function parse(markdown: string) {
  const ast = unified().use(remarkParse).use(remarkGfm).parse(markdown)
  return parseContents(ast.children)
}
