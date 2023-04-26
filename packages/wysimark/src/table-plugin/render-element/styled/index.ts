import styled from "@emotion/styled"
export * from "./styled-menu"

/**
 * Table
 */
export const $Table = styled("table")`
  border-collapse: collapse;
  margin: 1em 0;
`

/**
 * Table Row
 */
export const $TableRow = styled("tr")`
  position: relative;
  &:first-child {
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
  &:first-child {
    border-left-color: var(--table-border-color);
  }
  &:last-child {
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
  tr:first-child & {
    color: rgba(0, 0, 0, 0.6);
    font-size: 0.875em; /* 14px */
  }
`
