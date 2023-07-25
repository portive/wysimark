import type { Root, TopLevelContent } from "mdast"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import { unified } from "unified"

import { Element } from "../types"
import { parseContents } from "./parse-content"
import { transformInlineLinks } from "./transform-inline-links"

const parser = unified().use(remarkParse).use(remarkGfm)

export function parseToAst(markdown: string) {
  const ast = parser.parse(markdown) as Root
  /**
   * Takes linkReference and imageReference and turns them into link and image.
   */
  transformInlineLinks(ast)
  return ast
}

/**
 * Takes a Markdown string as input and returns a remarkParse AST
 */
export function parse(markdown: string): Element[] {
  const ast = parseToAst(markdown)
  /**
   * If there is no content, remark returns a root ast with no children (i.e.
   * no paragraphs) but for Slate, we need it to return an empty paragraph.
   *
   * So when this happens, we just generate an empty paragraph and return that
   * s he result.
   */
  if (ast.children.length === 0) {
    return [{ type: "paragraph", children: [{ text: "" }] }] as Element[]
  }

  return parseContents(ast.children as TopLevelContent[])
}
