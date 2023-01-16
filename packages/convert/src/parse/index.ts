import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import { unified } from "unified"

import { parseContents } from "./parse-content"
import { transformInlineLinks } from "./remark-inline-links"
// import { remarkInlineLinks } from "./remark-inline-links"

export function parseToAst(markdown: string) {
  const ast = unified().use(remarkParse).use(remarkGfm).parse(markdown)
  /**
   * Takes linkRefernce and imageReference and turns them into link and image.
   */
  transformInlineLinks(ast)
  return ast
}

/**
 * Takes a Markdown string as input and returns a remarkParse AST
 */
export function parse(markdown: string) {
  const ast = parseToAst(markdown)
  // log(ast)
  return parseContents(ast.children)
}
