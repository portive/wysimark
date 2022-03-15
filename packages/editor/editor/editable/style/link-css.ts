import { css } from "@emotion/core"

export const linkCss = css`
  /**
   * The "*" is needed to override the "*" in "styled-editable.ts"
   */
  a * {
    color: #0366d6;
    text-decoration: underline;
  }
`
