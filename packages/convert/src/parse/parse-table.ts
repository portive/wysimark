import type { Table, TableCell, TableRow } from "mdast"
import {
  TableCellElement,
  TableElement,
  TableRowElement,
} from "wysimark/src/table-plugin"

import { parsePhrasingContents } from "./parse-phrasing-content"

export function parseTable(table: Table): [TableElement] {
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
