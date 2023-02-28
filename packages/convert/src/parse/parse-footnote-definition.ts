import type { FootnoteDefinition } from "mdast"

import { Element } from "../types"
import { parseContents } from "./parse-content"

/**
 * GitHub Flavored Markdown does not support footnotes and therefore, at the
 * moment, Wysimark does not support footnotes.
 *
 * However, we do provide some compatibility. Remarks, by default, parses
 * Footnote Definitions and we convert them into a blockquote. We insert an
 * extra paragraph at the top that contains the footnote identifier in square
 * brackets like `[1]`
 */
export function parseFootnoteDefinition(
  footnote: FootnoteDefinition
): Element[] {
  return [
    {
      type: "block-quote",
      children: [
        /**
         * Insert an initial paragraph with the footnote identifier in square
         * brackets.
         */
        { type: "paragraph", children: [{ text: `[${footnote.identifier}]` }] },
        /**
         * The rest of the children are parsed as is and supports the full range
         * of element types like headings, lists and nested block quotes.
         */
        ...parseContents(footnote.children),
      ],
    },
  ]
}
