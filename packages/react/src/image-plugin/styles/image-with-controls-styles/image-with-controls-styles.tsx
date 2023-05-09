import styled from "@emotion/styled"

/**
 * Wrap the image with a container so we can accurately place UI elements
 * around it.
 */
export const $ImageContainer = styled("span")`
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

export const $Image = styled("img")`
  /**
   * TODO:
   *
   * This is a bit of a hack but is a better experience than not anything.
   *
   * Constrains the maximum resize width of an image to 100% of the space
   * available. This prevents the image from stepping outside its boundaries.
   *
   * Problem:
   *
   * - The "height" is set to "auto" which likely conflicts with the height
   *   provided as an image attribute of "height" set by the application.
   *   Effectively, this means that the "height" is ignored which is fine
   *   except when the image hasn't been loaded yet, I think it's possible
   *   and perhaps likely that there may be a reflow that happens before/after
   *   the image is loaded.
   */
  max-width: 100%;
  height: auto;

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
   * If the image isn't loaded yet, we want to have some color filling the space
   * that the image will eventually load into. This helps indicates to the user
   * the space that the image will fill into.
   *
   * Once the image is finished loading, we want to respect transparency so at
   * that point we hide the background shading.
   */
  .--loading > & {
    background: var(--shade-100);
  }

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
