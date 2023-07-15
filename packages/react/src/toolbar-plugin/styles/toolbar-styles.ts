import styled from "@emotion/styled"

export const $ToolbarContainer = styled("div")`
  /**
   * This flex rule applies to the "display: flex;" of the parent container.
   * Ensures the toolbar does not shrink or grow vertically.
   */
  flex: 0 0 auto;
  /**
   * If "position: sticky;" is not working, check the ancestor for "overflow:
   * hidden;" of any kind. This will stop sticky from working. A good workaround
   * is to use "overflow: clip;" instead.
   *
   * https://stackoverflow.com/a/73051006
   */
  position: sticky;
  top: 0;
  z-index: 2;
  background: var(--shade-50);
  /* font-size: 0.875em; */
  font-size: 0.9375em;
  padding: 0 0.5em;
  border-bottom: 1px solid var(--shade-300);
  /**
   * Prevent clicks from stealing focus from the editor
   */
  user-select: none;
  /**
   * Extreme attention to detail. When the sticky is ending and the toolbar
   * is stuck to the bottom of the editor, setting margin-bottom to -1px will
   * fix the 2px bottom border and make it the proper 1px.
   */
  margin-bottom: -1px;

  /**
   * NOTE: The space in the equation is significant
   */
  height: calc(
    3em + 1px
  ); // $ToolbarDivider height + border-bottom of 1px above
  overflow: hidden;
`

export const $Toolbar = styled("div")`
  display: inline-block;
  height: calc(
    3em + 1px
  ); // $ToolbarDivider height + border-bottom of 1px above
`

export const $ToolbarDividerContainer = styled("div")`
  display: inline-block;
  height: 3em;
  padding: 0 0.375em;
`

export const $ToolbarDivider = styled("div")`
  display: inline-block;
  background: var(--shade-300);
  opacity: 50%;
  width: 1px;
  height: 3em;
`

export const $ToolbarButton = styled("div")`
  position: relative;
  display: inline-block;
  vertical-align: top;
  font-size: 1.25em;
  margin-top: 0.25em;
  padding: 0.375em 0.375em;
  border-radius: 0.25em;
  text-align: center;
  color: var(--shade-500);
  transition: all 100ms;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0);
  &.--active {
    color: var(--shade-700);
    background: rgba(0, 0, 0, 0.05);
    svg {
      /* stroke-width: 2px; */
    }
  }
  svg {
    stroke-width: 1.5px;
  }
  &:hover {
    color: var(--shade-700);
    background: var(--blue-100);
    svg {
      /* stroke-width: 2px; */
    }
  }

  &.--more {
    padding: 0.375em 0.5em;
  }
  .--more-icon {
    position: absolute;
    bottom: -0.2em;
    left: 50%;
    margin-left: -0.25em;
    opacity: 0.375;
  }
`
