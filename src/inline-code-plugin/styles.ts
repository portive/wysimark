import { styled } from "goober"
import { forwardRef } from "react"

export const $InlineCode = styled("code", forwardRef)`
  background-color: var(--inline-code-bgcolor);
  border: 1px solid var(--inline-code-border-color);
  border-radius: 0.25em;
  padding: 0.125em 0.125em;
  font-size: 0.875em;
`

/**
 * These invisible spans fix a bug in Chrome which doesn't allow the cursor to
 * sit on both the "inside" and "outside" of the inline-code span. By placing
 * this 1px wide span just inside of the inline code, we are able to workaround
 * this limitation.
 */
export const $InvisibleSpan = styled("span", forwardRef)`
  display: inline-block;
  opacity: 0;
  width: 1px;
  overflow: hidden;
`
