import { Editable } from "slate-react"
import { colors } from "~/editor/colors"
import styled from "@emotion/styled"
import { blockQuoteCss } from "./style/block-quote-css"
import { codeCss } from "./style/code-css"
import { flushCss } from "./style/flush-css"
import { hrCss } from "./style/hr-css"
import { linkCss } from "./style/link-css"
import { listCss } from "./style/list-css"
import { markCss } from "./style/mark-css"
import { mediaCss } from "./style/media-css"
import { tableCss } from "./style/table-css"

const $Editable = styled(Editable)`
  color: #101010;
  background: #ffffff;

  /**
   * Reflects the border radius around the editor
   */
  border-radius: ${colors.editorBorderRadius};

  /**
   * This allows us to win the selector when the target of a selector outside
   * of Wysimark is of the innermost element. We may have more selector
   * specificity, but the inner most selector will be the displayed style.
   */
  * {
    color: #101010;
  }

  /**
   * Fade in effect. "--initial-editor-content" is set very quickly on first
   * load to allow animation to happen.
   */

  opacity: 1;
  transition: opacity 1s;
  .--initial-editor-content & {
    opacity: 0;
  }

  /**
   * Padding around content area
   */

  padding: 1em 1.5em;

  /**
   * IMPORTANT!
   *
   * This provides important flex styling related to its parent container
   * "editor-with-toolbar.tsx".
   *
   * See that file on why this is necessary.
   */

  flex: 1 1 auto;
  overflow-y: auto;

  /* On iPhone, it doesn't use the full width and the toolbar doesn't size
   * correctly above it so we have to add this. May have something to do with
   * the fact it is in a flex container. Works fine in Chrome without it.
   */

  width: 100%;

  /**
   * Default font size
   */

  font-size: 16px;

  /**
   * Default line height
   */

  line-height: 1.5;

  /**
   * Imported CSS styles in alphabetical order
   */

  ${blockQuoteCss}
  ${codeCss}
  ${flushCss}
  ${hrCss}
  ${linkCss}
  ${listCss}
  ${markCss}
  ${mediaCss}
  ${tableCss}
`

export { $Editable }
