import { css } from "@emotion/core"

export const markCss = css`
  /* Code */

  span.code {
    padding: 0.4em 0.2em;
    color: #404040;
    background: #f0f2f4;
    font-family: monospace;
    font-size: 0.85em;
    border-radius: 0.5em;
  }

  /* Bold */

  span.bold {
    /**
     * Look better in San Francisco at 600 instead of bold.
     * Fonts without 600 (semi-bold) should fallback to bold.
     */
    font-weight: bold;
    font-weight: 600;
    color: black;
  }

  /* Italic */

  span.italic {
    font-style: italic;
  }

  /* Strikeout */

  span.del {
    text-decoration: line-through;
  }

  /* Superscript */

  span.sup {
    vertical-align: super;
    font-size: 0.75em;
  }

  /* Subscript */

  span.sub {
    vertical-align: sub;
    font-size: 0.75em;
  }

  /*
   * Bold in heading should render extra bold
   */

  h1 .bold,
  h2 .bold,
  h3 .bold,
  h4 .bold,
  h5 .bold,
  h6 .bold {
    font-weight: 800;
  }
`
