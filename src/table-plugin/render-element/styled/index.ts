import { styled } from "goober"
import { forwardRef } from "react"
export * from "./styled-menu"

/**
 * Table
 */
export const $Table = styled("table", forwardRef)`
  border-collapse: collapse;
  margin: 1em 0;
`

/**
 * Table Row
 */
export const $TableRow = styled("tr", forwardRef)`
  position: relative;
  &:first-child {
    background: rgba(0, 0, 0, 0.025);
  }
`

/**
 * Table Cell
 *
 * - `--selected` indicates selected cell
 */
export const $TableCell = styled("td", forwardRef)`
  position: relative;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.05);
  padding: 0.75em 1em;
  min-width: 2em;
  &.--selected {
    outline: 2px solid royalblue;
  }
  /**
   * Stronger borders on the left and right edge
   */
  &:first-child {
    border-left-color: rgba(0, 0, 0, 0.2);
  }
  &:last-child {
    border-right-color: rgba(0, 0, 0, 0.2);
  }
`

/**
 * Table Content (inside Table Cell)
 */
export const $TableContent = styled("div", forwardRef)`
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
