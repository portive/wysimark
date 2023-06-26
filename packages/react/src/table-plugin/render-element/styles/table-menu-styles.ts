import styled from "@emotion/styled"

/**
 * Table Menu
 */

const $BaseMenu = styled("div")`
  position: absolute;
  /**
   * very slightly shaded
   */
  background: rgba(0, 0, 0, 0.001);

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

export const $ColumnMenu = styled($BaseMenu)`
  cursor: pointer;
  /**
   * hangs out on top
   */
  left: -1px;
  right: -1px;
  right: 0;
  height: 3em;
  top: -3em;
`

export const $RowMenu = styled($BaseMenu)`
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

const $MenuTile = styled("div")`
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
export const $ColumnMenuTile = styled($MenuTile)`
  top: 50%;
  border-bottom: none;
  border-right: none;
  bottom: 1px;
  td:first-of-type & {
    border-top-left-radius: 0.5em;
  }
  td:last-of-type & {
    border-top-right-radius: 0.5em;
    border-right: 1px solid rgba(0, 0, 0, 0.05);
    right: -1px;
  }
  svg {
    position: absolute;
    top: 0.1875em;
    left: 50%;
    margin-left: -0.5em;
    color: rgba(0, 0, 0, 0.2);
  }
  &:hover svg {
    color: rgba(0, 0, 0, 0.5);
  }

  /* border-top-left-radius: 0.5em;
  border-top-right-radius: 0.5em; */
`

/**
 * The `$RowMenuTile` is the visible part of the `$RowMenu` and is the right
 * half of the `$RowMenu`.
 */
export const $RowMenuTile = styled($MenuTile)`
  left: 50%;
  border-right: none;
  border-bottom: none;
  right: 1px;
  tr:first-of-type & {
    border-top-left-radius: 0.5em;
  }
  tr:last-of-type & {
    border-bottom-left-radius: 0.5em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    bottom: 0;
  }
  svg {
    position: absolute;
    left: 0.25em;
    top: 50%;
    margin-top: -0.5em;
    color: rgba(0, 0, 0, 0.2);
  }
  &:hover svg {
    color: rgba(0, 0, 0, 0.5);
  }

  /* border-top-left-radius: 0.5em;
  border-bottom-left-radius: 0.5em; */
`

/**
 * Menu Button
 */

const $MenuButton = styled("div")`
  position: absolute;
  font-size: 1.5em;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  svg {
    display: block;
  }
`

export const $AddMenuButton = styled($MenuButton)`
  color: #c0c0c0;
  &:hover {
    color: royalblue;
  }
`

export const $RemoveMenuButton = styled($MenuButton)`
  color: #c0c0c0;
  &:hover {
    color: firebrick;
  }
`
