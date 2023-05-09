import styled from "@emotion/styled"

export const $MarksSpan = styled("span")`
  &.--bold {
    font-weight: bold;
  }
  &.--italic {
    font-style: italic;
  }
  &.--underline {
    text-decoration: underline;
  }
  &.--sup {
    vertical-align: super;
    font-size: 0.75em;
  }
  &.--sub {
    vertical-align: sub;
    font-size: 0.75em;
  }
  &.--strike {
    text-decoration: line-through;
  }
  /**
   * Text decorations don't merge automatically so we make a special one
   * when there is both an underline and a strike through.
   */
  &.--underline.--strike {
    text-decoration: underline line-through;
  }
`
