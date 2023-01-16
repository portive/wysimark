import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import { unified } from "unified"

import { parseContents } from "./parse-content"
import { transformInlineLinks } from "./remark-inline-links"

const parser = unified().use(remarkParse).use(remarkGfm)

export function parseToAst(markdown: string) {
  const ast = parser.parse(markdown)
  /**
   * Takes linkReference and imageReference and turns them into link and image.
   */
  transformInlineLinks(ast)
  return ast
}

/**
 * Takes a Markdown string as input and returns a remarkParse AST
 */
export function parse(markdown: string) {
  const ast = parseToAst(markdown)
  return parseContents(ast.children)
}
