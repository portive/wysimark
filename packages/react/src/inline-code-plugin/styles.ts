import styled from "@emotion/styled"

export const $InlineCode = styled("code")`
  color: var(--shade-600);
  background-color: var(--inline-code-bgcolor);
  border: 1px solid var(--inline-code-border-color);
  border-radius: 0.25em;
  padding: 0.1375em 0.125em;
  /**
   * Font Stack from
   * https://qwtel.com/posts/software/the-monospaced-system-ui-css-font-stack/
   */
  font-family: ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono",
    "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro",
    "Fira Mono", "Droid Sans Mono", "Courier New", monospace;
  /**
   * This font size may seem smaller but any larger (including 0.875) means that
   * it messes up the line height of the normal text. Not sure why this happens
   * with the monospace font but seems to happen on both the default 'monospace'
   * font as well as the font stack above.
   */
  font-size: 0.75em;
  vertical-align: baseline;
`

/**
 * These invisible spans fix a bug in Chrome which doesn't allow the cursor to
 * sit on both the "inside" and "outside" of the inline-code span. By placing
 * this 1px wide span just inside of the inline code, we are able to workaround
 * this limitation.
 */
export const $InvisibleSpan = styled("span")`
  display: inline-block;
  opacity: 0;
  width: 1px;
  overflow: hidden;
`
