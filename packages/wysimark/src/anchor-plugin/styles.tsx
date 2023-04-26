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
