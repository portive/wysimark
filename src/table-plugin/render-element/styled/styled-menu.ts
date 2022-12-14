import { styled } from "goober"
import { forwardRef } from "react"

/**
 * Table Menu
 */

const $Menu = styled("div", forwardRef)`
  position: absolute;
  /**
   * very slightly shaded
   */
  background: rgba(0, 0, 0, 0.01);

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
    .--tile {
      background: rgba(0, 0, 0, 0.15);
    }
  }
`

export const $ColumnMenu = styled($Menu, forwardRef)`
  /**
   * hangs out on top
   */
  left: -1px;
  right: -1px;
  height: 3em;
  top: -3em;
`

export const $RowMenu = styled($Menu, forwardRef)`
  /**
   * hangs out on left
   */
  top: -1px;
  bottom: -1px;
  width: 3em;
  left: -3em;
`

/**
 * Menu Tile
 */

const $MenuTile = styled("div", forwardRef)`
  position: absolute;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 200ms;
  /**
   * NOTE: One of these should be overridden
   */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

/**
 * The `$RowMenuTile` is the visible part of the `$RowMenu` and is the right
 * half of the `$RowMenu`.
 */
export const $ColumnMenuTile = styled($MenuTile, forwardRef)`
  top: 50%;
  border-top-left-radius: 0.5em;
  border-top-right-radius: 0.5em;
`

/**
 * The `$RowMenuTile` is the visible part of the `$RowMenu` and is the right
 * half of the `$RowMenu`.
 */
export const $RowMenuTile = styled($MenuTile, forwardRef)`
  left: 50%;
  border-top-left-radius: 0.5em;
  border-bottom-left-radius: 0.5em;
`

/**
 * Menu Button
 */

const $MenuButton = styled("div", forwardRef)`
  position: absolute;
  font-size: 1.5em;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  svg {
    display: block;
  }
`

export const $AddMenuButton = styled($MenuButton, forwardRef)`
  color: #c0c0c0;
  &:hover {
    color: royalblue;
  }
`

export const $RemoveMenuButton = styled($MenuButton, forwardRef)`
  color: #c0c0c0;
  &:hover {
    color: firebrick;
  }
`
