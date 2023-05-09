import styled from "@emotion/styled"

export const $ImageToolbar = styled("span")`
  position: absolute;
  /**
   * On top of the image +1 for space inside outline, +2 for outline,
   * +2 for space outside outline.
   *
   * DO NOT MOVE TO BOTTOM:
   *
   * This is a reminder not to move the preset to the bottom. Visually, it is
   * less obtrusive at the bottom; however, an issue is that when switching
   * between different presets, the preset UI moves up/down making it difficult
   * to switch between different presets. When kept at the top, the preset
   * UI doesn't move.
   */
  top: calc(-1.5em - 5px);
  /**
   * Align left to the outline: +1 for space inside outline, +2 for outline
   * width
   */
  left: -3px;
  /**
   * When we're resizing, the controls aren't usable and just add to visual
   * clutter so we hide it. The transition lets us do it smoothly and less
   * obtrusively.
   */
  transition: opacity 200ms;
  .--dragging & {
    opacity: 0;
  }
  display: flex;
  gap: 0.25em;
`
