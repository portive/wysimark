import { css } from "@emotion/core"

export const flushCss = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.2;
    padding-bottom: 0.25em;
  }
  h1 {
    font-size: 2em;
    font-weight: 600;
    line-height: 1.1;
  }
  h2 {
    font-size: 1.6em;
    font-weight: 600;
  }
  h3 {
    font-size: 1.36em;
    font-weight: 600;
  }
  h4 {
    font-size: 1.22em;
    font-weight: 600;
  }
  h5 {
    font-size: 1.13em;
    font-weight: 600;
  }
  h6 {
    font-size: 1em;
    font-weight: 600;
  }

  p {
    color: #202020;
    font-size: 1em;
  }

  /*
   * Flush Margins
   *
   * We only want spaces between headings if the heading is not at the top of
   * the document. This is because we don't want a gap at the top of the
   * document if the first element is a heading.
   */

  * + h1,
  * + h2,
  * + h3 {
    /* padding-top: 0.5em;
    padding-bottom: 0.5em; */
    padding: 0.5em 0 0.25em;
    /* margin-top: 1em; */
  }
  * + h4,
  * + h5,
  * + h6 {
    padding: 1em 0 0.25em;
    /* margin-top: 1.5em; */
  }
  * + p {
    /* margin-top: 1em; */
    padding: 0.5em 0;
  }
  h4 + p,
  h5 + p,
  h6 + p {
    /* margin-top: 0.5em; */
  }
`
