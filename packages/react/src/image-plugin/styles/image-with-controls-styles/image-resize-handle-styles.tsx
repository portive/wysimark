import styled from "@emotion/styled"

export const $ImageResizeInvisibleHandle = styled("span")`
  position: absolute;
  display: block;
  /**
   * Prevent touch dragging from exhibiting a kind of scroll bounce behavior
   * when we just want the image to resize.
   */
  touch-action: none;
  background: rgba(127, 127, 127, 0.001);
  top: 0;
  right: calc(-1em - 2px);
  width: 2em;
  bottom: 0;
  &.--left {
    cursor: w-resize;
  }
  &.--center {
    cursor: ew-resize;
  }
  &.--right {
    cursor: e-resize;
  }
  &.--small {
    right: calc(-1.25em);
    /* background: green; */
    width: 1.25em;
  }
`
export const $ImageResizeHandle = styled("span")`
  position: absolute;
  display: block;
  background: var(--select-color);
  top: 50%;
  margin-top: -1em;
  width: 1em;
  height: 2em;
  outline: 1px solid white;
  transition: all 250ms;
  /**
   * The handle is 3 visible states depending on whether the image is at
   * maximum size or minimum size.
   *
   * There are three indicators that let the user know which directions are
   * available (left, right or both) that the user can drag:
   *
   * - rounded corners on the side that are available to drag towards
   * - on larger size image, the handle is on the inside, middle or outside
   *   of the outline
   * - the cursor pointer indicates the direction available for resizing.
   */
  .--center > & {
    left: 0.5em;
    border-radius: 0.375em;
  }
  .--left > & {
    border-radius: 0.5em 0 0 0.5em;
    left: 1px;
  }
  .--right > & {
    border-radius: 0 0.5em 0.5em 0;
    left: calc(50% - 1px);
  }
  .--bar {
    position: absolute;
    background: var(--blue-200);
    width: 1px;
    top: 0.5em;
    bottom: 0.5em;
  }
  /**
   * Each of 3 bars is 1px wide and 3px apart
   */
  .--bar-left {
    left: calc(50% - 3.5px);
  }
  .--bar-center {
    left: calc(50% - 0.5px);
  }
  .--bar-right {
    left: calc(50% + 2.5px);
  }
  /**
   * When the image is small, we reduce the size of the handler and place it
   * outside the image. The reasons we do this:
   * 
   * - If the handle is not outside the image at small sizes, the handle
   *   obscures the image too much. At larger sizes, it works okay and the
   *   inside handle placement makes the available direction of the drags more
   *   intuitive.
   *
   * - Also, at small sizes, a large handle can overwhelm the image. That is,
   *   the handle can be twice as tall as the image itself which looks poor.
   *   It's still possible for the handle to be larger than the image at small
   *   sizes, but this is okay in that we don't want the handle to become so
   *   small that it is hard to see and hard to click.
   */
  .--small > & {
    /**
     * We opt to mainly adjust the size of the handle at smaller sizes by
     * adjusting the font-size. This is more efficient than changing all the
     * border-sizes because changing the font-size automatically changes the
     * size of the border, but we don't have to redo the different combinations
     * border-size and the corner that they need to display on.
     */
    font-size: 0.5em;
    width: 1.5em;
    left: 0.5em;
    margin-top: -1em;
  }
  /**
   * Each of 2 bars is 1px wide and 3px apart
   */
  .--small > & > .--bar-left {
    left: calc(50% - 2px);
  }
  .--small > & > .--bar-center {
    display: none;
  }
  .--small > & > .--bar-right {
    left: calc(50% + 1px);
  }
`
