import styled from "@emotion/styled"

export const $TableMenu = styled("div")`
  position: absolute;
  /**
   * very slightly shaded
   */
  background: rgba(0, 0, 0, 0.001);

  /**
   * hangs out on left
   */
  top: -1.5em;
  left: -4em;
  height: 2.5em;
  width: 2.5em;

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
    .--row-menu-tile {
      background: rgba(0, 0, 0, 0.15);
    }
  }
`

/**
 * The `$RowMenuTile` is the visible part of the `$RowMenu` and is the right
 * half of the `$RowMenu`.
 */
export const $TableMenuTile = styled("div")`
  position: absolute;
  left: 0;
  top: 0;
  width: 1.5em;
  height: 1.5em;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
`
