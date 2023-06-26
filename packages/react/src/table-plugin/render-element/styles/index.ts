import styled from "@emotion/styled"

import { TableColumn } from "../../types"
export * from "./table-menu-styles"

/**
 * Table
 */
export const $Table = styled("table")<{ columns: TableColumn[] }>`
  border-collapse: collapse;
  margin: 1em 0;
  ${({ columns }) =>
    columns
      .map(
        (column, index) =>
          `td:nth-of-type(${index + 1}) { text-align: ${column.align}; }`
      )
      .join("\n")}
`

/**
 * Table Row
 */
export const $TableRow = styled("tr")`
  position: relative;
  &:first-of-type {
    background: var(--table-head-bgcolor);
  }
`

/**
 * Table Cell
 *
 * - `--selected` indicates selected cell
 */
export const $TableCell = styled("td")`
  position: relative;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.05);
  border-color: var(--table-row-border-color) var(--table-column-border-color);
  padding: 0.75em 1em;
  min-width: 2em;
  &.--selected {
    outline: 2px solid var(--select-color, blue);
  }
  /**
   * Stronger borders on the left and right edge
   */
  &:first-of-type {
    border-left-color: var(--table-border-color);
  }
  &:last-of-type {
    border-right-color: var(--table-border-color);
  }
`

/**
 * Table Content (inside Table Cell)
 */
export const $TableContent = styled("div")`
  /**
   * Smaller font inside a table than outside of it
   */
  font-size: 0.9375em; /* 15px */
  /**
   * Even smaller font and dimmer for the heading row
   */
  tr:first-of-type & {
    color: rgba(0, 0, 0, 0.6);
    font-size: 0.875em; /* 14px */
  }
`
