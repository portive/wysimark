import moveImagesToRoot from "mdast-move-images-to-root"
import remarkDisableTokenizers from "remark-disable-tokenizers"
import remarkInlineLinks from "remark-inline-links"
import remarkParse from "remark-parse"
import remarkSubSuper from "remark-sub-super"
import unified from "unified"
import { TopLevelContent } from "./index"

const parser = unified()
  .use(remarkParse)
  .use(remarkSubSuper)
  .use(remarkDisableTokenizers, { inline: ["url"] })

/**
 * Takes some markdown and returns an ast making sure to add the propery
 * plugins along the way.
 */
export function parseAst(markdown: string) {
  const ast = parser.parse(markdown)

  /**
   * Turns links with references are turned into inline links.
   */
  remarkInlineLinks()(ast)

  /**
   * Must be after `remarkInlineLinks` because inline links creates images
   */
  moveImagesToRoot()(ast)
  return ast.children as TopLevelContent[]
}
