import { styled } from "goober"
import { forwardRef } from "react"

export const $ColumnMenu = styled("div", forwardRef)`
  position: absolute;
  /**
   * very slightly shaded
   */
  background: rgba(0, 0, 0, 0.01);

  /**
   * hangs out on left
   */
  left: -1px;
  right: -1px;
  height: 2.75em;
  top: -2.75em;

  /**
   * hover 
   */
  &:hover {
    /**
     * needs to pop up so that it doesn't jump back and forth with neighbor
     * below
     */
    z-index: 1000;
    /**
     * Makes the visible tile get darker on hover over any part of the
     * menu including the invisible part
     */
    .--column-menu-tile {
      background: rgba(0, 0, 0, 0.15);
    }
  }
`

/**
 * The `$RowMenuTile` is the visible part of the `$RowMenu` and is the right
 * half of the `$RowMenu`.
 */
export const $ColumnMenuTile = styled("div", forwardRef)`
  position: absolute;
  top: 62.5%;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.05);
  border-top-left-radius: 0.5em;
  border-top-right-radius: 0.5em;
`
