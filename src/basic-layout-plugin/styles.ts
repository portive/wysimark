import { styled } from "goober"
import { forwardRef } from "react"

export const $Editable = styled("div", forwardRef)`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 2em;
  border: 1px solid rgb(203 213 225); /* shade-300 */
  border-radius: 0.5em;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  color: rgb(39 39 42); /* shade-800 */
  line-height: 1.5;
  /**
   * !important is required because of role="textbox" I think
   */
  outline: 2px solid transparent !important;
  transition: all 250ms;
  &.--focused {
    /**
     * !important is required because of role="textbox" I think
     */
    outline: 2px solid var(--select-editor-color) !important;
  }
`
