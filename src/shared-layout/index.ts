import { styled } from "goober"
import { forwardRef } from "react"

/**
 * NOTE:
 *
 * This $Container should be extended and the following should be
 * added to it:
 *
 * - padding: We add this separately because if there is a toolbar, there
 *   should be no padding on the container but there should be
 *   padding on the actual editable. If it is the basic layout, we can add
 *   the padding on the $Container but also use the $Container styling
 *   directly on the Editable Component.
 */
export const $Container = styled("div", forwardRef)`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
