import { Descendant } from "slate"

import { TableCellElement } from "../types"

export function createCell(
  index: number,
  children: Descendant[] = [{ type: "paragraph", children: [{ text: "" }] }]
): TableCellElement {
  return {
    type: "table-cell",
    index,
    children,
  }
}
