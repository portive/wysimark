import { Descendant } from "slate"

/**
 * Alignment of Table Columns
 */
export type TableColumnAlign = "left" | "center" | "right"

/**
 * Table Column values
 */

export type TableColumn = { align: TableColumnAlign }

/**
 * Table Element
 */

export type TableElement = {
  type: "table"
  columns: TableColumn[]
  children: TableRowElement[]
}

/**
 * Table Row Element
 */

export type TableRowElement = {
  type: "table-row"
  children: TableCellElement[]
}

/**
 * Table Cell Element
 *
 * The children of a `TdElement` is exactly one `ParagraphElement`.
 *
 * This is a good choice for Slate because copying and pasting a range of
 * elements will split the lowest child element by default. If the child of
 * a `TdElement` is a leaf, then we split the `TdElement` which is never what
 * we want.
 *
 * Instead, by having a lower level element, the `ParagraphElement`, we allow
 * that to be split.
 *
 * But of course, insertion means we have many child elements in the `TdElement`
 * but these are easier to fix using normalization. We can keep iterating
 * through normalizations until we end up with a single Paragraph.
 */

export type TableCellElement = {
  type: "table-cell"
  x?: number
  y?: number
  children: TableContentElement[]
}

export type TableContentElement = {
  type: "table-content"
  children: Descendant[]
}
