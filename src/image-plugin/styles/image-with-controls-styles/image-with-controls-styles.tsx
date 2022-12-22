import { styled } from "goober"
import { forwardRef } from "react"

/**
 * Wrap the image with a container so we can accurately place UI elements
 * around it.
 */
export const $ImageContainer = styled("span", forwardRef)`
  /**
   * In order for this container to wrap tightly (without space), it needs to be
   * an "inline-block". If it's just an "inline" we end up with spacing
   * artificats related to how spacing is placed around text.
   */
  display: inline-block;
  /**
   * This wrapper's primary purpose (why we don't use the image by itself) is
   * so that we can place UI controls for the image in and around the image.
   */
  position: relative;
`

export const $Image = styled("img", forwardRef)`
  /**
   * Rounded borders are pretty and also help the selection outline look
   * pretty.
   */
  transition: border-radius 250ms;
  border-radius: 0.5em;
  .--small > & {
    border-radius: 1px;
  }
  display: block;

  /**
   * Selection border. We leave a space between the outline and the image so
   * that an image that is the same color as the selection border will still
   * look selected.
   */
  .--selected > & {
    outline: 2px solid var(--select-color);
    outline-offset: 1px;
  }
  /**
   * If the image hasn't loaded yet, we want to have some color filling the
   * space that the image will eventually load into.
   */
  background: var(--shade-100);

  /**
   * When we change the image via a preset, we want to animate the change;
   * however, when we are dragging to resize, a transition adds a janky delay
   * to the resize so we remove the transition during drag resizing.
   */
  transition: width 100ms, height 100ms;
  .--dragging > & {
    transition: border-radius 250ms;
  }
`
