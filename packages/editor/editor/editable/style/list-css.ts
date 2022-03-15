import { css } from "@emotion/core"

export const listCss = css`
  ul,
  ol {
    padding-left: 16px;
  }
  li {
    display: list-item;
    position: relative;
    padding-left: 0.25em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    margin-left: 1em;
  }
  /**
   * Ordered List
   */
  ol li {
    list-style: decimal outside;
  }
  /**
   * Bulleted list
   */
  ul.--unordered li {
    list-style-type: disc;
  }
  /**
   * Task List
   */
  ul.--task li {
    /**
     * We don't want a bullet or numbers so we specify this as none
     */
    list-style-type: none;

    /**
     * Checkbox
     *
     * Position the checkbox
     */

    svg {
      cursor: pointer;
      position: absolute;
      top: 2px;
      left: -1.25em;
    }

    &.--is-editing {
      .fa {
        cursor: pointer;
      }
      /**
       * TODO: Get hover styles on checkbox working.
       *
       * These hover styled don't work and it's related to the "*" selector
       * from above or the fact that we are using svg now and :hover doesn't
       * work with it. Not sure but it would be nice to have these working.
       *
       * We can also use mouse event handlers to do this if required.
       */
      /**
      .fa-check-square * {
        &:hover * {
          color: #0060e0;
        }
      }
      .fa-square * {
        &:hover * {
          color: #808080;
        }
      }
      */
    }
  }

  p + ol,
  h1 + ol,
  h2 + ol,
  h3 + ol,
  h4 + ol,
  h5 + ol,
  h6 + ol,
  p + ul,
  h1 + ul,
  h2 + ul,
  h3 + ul,
  h4 + ul,
  h5 + ul,
  h6 + ul {
    margin-top: 1.25rem;
  }
`
