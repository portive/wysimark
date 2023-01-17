import type { BlockContent, Table, TableCell, TableRow } from "mdast"
import { Element } from "wysimark/src"
import {
  TableCellElement,
  TableElement,
  TableRowElement,
} from "wysimark/src/table-plugin"

import { log } from "../test/test-utils"
import { assertUnreachable } from "../utils"
import { parseBlockquote } from "./parse-blockquote"
import { parseCodeBlock } from "./parse-code-block"
import { parseHeading } from "./parse-heading"
import { parseHTML } from "./parse-html"
import { parseList } from "./parse-list"
import { parseParagraph } from "./parse-paragraph"
import { parsePhrasingContents } from "./parse-phrasing-content"
import { parseThematicBreak } from "./parse-thematic-break"

export function parseContents(contents: BlockContent[]): Element[] {
  const elements: Element[] = []
  for (const content of contents) {
    elements.push(...parseContent(content))
  }
  return elements
}

export function parseContent(content: BlockContent): Element[] {
  switch (content.type) {
    case "blockquote":
      return parseBlockquote(content)
    case "code":
      return parseCodeBlock(content)
    case "heading":
      return parseHeading(content)
    case "html":
      return parseHTML(content)
    case "list":
      return parseList(content)
    case "paragraph":
      return parseParagraph(content)
    case "table":
      return parseTable(content)
    case "thematicBreak":
      return parseThematicBreak()
  }
  assertUnreachable(content)
}

function parseTable(table: Table): [TableElement] {
  if (table.align == null)
    throw new Error(`Expected an array of AlignType for table.align`)
  return [
    {
      type: "table",
      columns: table.align.map((align) => ({
        align: align || "left",
      })),
      children: table.children.map(parseTableRow),
    },
  ]
}

function parseTableRow(row: TableRow): TableRowElement {
  if (row.type !== "tableRow") throw new Error(`Expected a tableRow`)
  return { type: "table-row", children: row.children.map(parseTableCell) }
}

function parseTableCell(cell: TableCell): TableCellElement {
  if (cell.type !== "tableCell") throw new Error(`Expected a tableCell`)
  return {
    type: "table-cell",
    children: [
      {
        type: "table-content",
        children: parsePhrasingContents(cell.children),
      },
    ],
  }
}
