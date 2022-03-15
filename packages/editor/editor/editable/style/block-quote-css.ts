import { colors } from "~/editor/colors"
import { css } from "@emotion/core"

export const blockQuoteCss = css`
  /**
   * Blockquote
   */

  blockquote {
    &::before {
      background: ${colors.blockquoteBar};
      position: absolute;
      left: 0;
      width: 0.25em;
      top: 0.75em;
      bottom: 0.75em;
      border-radius: 0.125em;
      content: "";
    }
    /* border-left: 0.25em solid #ececec; */
    padding: 1.5em 0 1.5em 1.75em;
    position: relative;
  }
`
