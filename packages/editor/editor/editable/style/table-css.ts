import { colors } from "~/editor/colors"
import { css } from "@emotion/core"

export const tableCss = css`
  /**
   * Table
   */

  table {
    padding: 1em 0;
    display: block;
    overflow-x: auto;
    border-collapse: separate;

    /**
     * Fade in animation for tables
     */
    &.--initial {
      opacity: 0;
    }
    opacity: 1;
    transition: opacity linear 200ms;

    /**
     * First row of Table
     */

    tr:first-of-type td {
      background: ${colors.tableHeadBackgroundColor};
    }

    tr:first-of-type td:first-of-type {
      border-top-left-radius: ${colors.borderRadius};
    }
    tr:first-of-type td:last-of-type {
      border-top-right-radius: ${colors.borderRadius};
    }
    tr:last-of-type td:first-of-type {
      border-bottom-left-radius: ${colors.borderRadius};
    }
    tr:last-of-type td:last-of-type {
      border-bottom-right-radius: ${colors.borderRadius};
    }
    td:last-of-type {
      border-right: 1px solid ${colors.tableBorderColor};
    }
    tr:last-of-type td {
      border-bottom: 1px solid ${colors.tableBorderColor};
    }

    /**
     * Table cells
     */

    td {
      padding: 0.5em 1em;
      border-left: 1px solid ${colors.tableBorderColor};
      border-top: 1px solid ${colors.tableBorderColor};
      min-width: 6em;
      @media print {
        border: 1px solid black;
      }
    }
  }
`
