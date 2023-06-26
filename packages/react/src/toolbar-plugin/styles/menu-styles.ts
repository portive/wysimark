import styled from "@emotion/styled"

import { $Panel } from "../../shared-overlays/styles/$Panel"

/**
 * Drop Down Menu
 */
export const $Menu = styled($Panel)`
  position: absolute;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  transition: all 200ms;
  /**
   * Prevent clicks from stealing focus from the editor
   */
  user-select: none;
`

/**
 * Individual items in Drop Down Menu
 */
export const $MenuItem = styled("div")`
  display: flex;
  z-index: 10;
  padding: 0 1em 0 1.5em;
  height: 2em;
  align-items: center;
  /**
   * Normally we don't do it this way but since each part of the MenuItem
   * is tightly related to the display: flex, this seemed the easiest way
   * to set this up.
   */
  .--icon {
    flex: 0 0;
    display: block;
    font-size: 1.25em;
    height: 1em;
    padding-right: 0.75em;
    color: var(--shade-400);
    svg {
      position: relative;
      stroke-width: 1.5px;
    }
  }
  .--title {
    flex: 1 0;
    font-size: 0.875em;
    color: var(--shade-800);
  }
  .--hotkey {
    flex: 0 0;
    font-size: 0.75em;
    padding-left: 1.5em;
    color: var(--shade-500);
  }
  background: white;
  cursor: pointer;
  &:hover {
    background: var(--blue-50);
  }
`

export const $MenuDivider = styled("div")`
  height: 1px;
  background: var(--shade-200);
  margin-top: 0.25em;
  margin-bottom: 0.25em;
`
