import { TableElement } from "~/editor/types"
import { assertDefined } from "~/lib/assert-defined"
import * as Mdast from "../mdast"
import { parseLine } from "./parse-line"

/**
 * Parse table
 */
export function parseTableNode(tableNode: Mdast.Table): TableElement {
  const firstRowCells = tableNode.children[0].children
  assertDefined(tableNode.align, "tableNode.align")
  const align = [...tableNode.align]
  for (let i = align.length; i < firstRowCells.length; i++) {
    align[i] = "left"
  }
  assertDefined(align, "align")
  return {
    type: "table",
    columns: align.map((dir) =>
      dir == null ? { align: "left" } : { align: dir }
    ),
    children: tableNode.children.map((trNode) => ({
      type: "tr",
      children: trNode.children.map((tdNode, index: number) => ({
        type: "td",
        index: index,
        children: [{ type: "p", children: parseLine(tdNode.children, {}) }],
      })),
    })),
  }
}
