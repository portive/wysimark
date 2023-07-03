import styled from "@emotion/styled"

export const $Anchor = styled("a")`
  /**
   * Link colors
   */
  color: var(--link-color, blue);
  &:hover {
    color: var(--link-hover-color, blue);
  }
  /**
   * When the cursor is in the anchor and not outside the anchor, we style the
   * anchor with a very light shade. This is enough to subtly intuit to the user
   * that when they type, it will appear inside the link. When the shade is
   * not present, they intuit they are just outside the link.
   */
  border-radius: 0.125em;
  transition: background-color 250ms;
  &.--selected {
    background: var(--blue-50);
  }
`
/**
 * This edge piece that are at the edge of the inside of the anchor are visibly
 * designed to be 1px wide. A <span> can't be given a width so we fake this by
 * creating an empty span with 1px of width.
 */
export const $Edge = styled("span")`
  display: inline;
  padding: 0 1px 0 0;
`

/**
 * Shows progress bar of an uploading attachment. This part is the outline.
 */
export const $ProgressBar = styled("span")`
  position: fixed;
  width: 100px;
  background: var(--shade-50);
  height: 8px;
  border-radius: 7px;
  border: 1px solid var(--shade-400);
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`

/**
 * Show the fill part of the progress bar.
 */
export const $ProgressBarFill = styled("span")`
  position: absolute;
  left: 0;
  top: 0;
  height: 14px;
  background: var(--blue-400);
  transition: width 100ms linear;
`
