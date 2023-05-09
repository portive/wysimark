import styled from "@emotion/styled"

import { SinkReset } from "../sink/editable"

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
export const $Container = styled(SinkReset)`
  border: 1px solid var(--shade-300); /* shade-300 */
  border-radius: 0.5em;
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
