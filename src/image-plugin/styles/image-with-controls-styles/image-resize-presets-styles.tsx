import { styled } from "goober"
import { forwardRef } from "react"

export const $ImageResizePresets = styled("div", forwardRef)`
  position: absolute;
  /**
   * On top of the image +1 for space inside outline, +2 for outline,
   * +2 for space outside outline.
   */
  top: calc(-2em - 5px);
  /**
   * Align left to the outline: +1 for space inside outline, +2 for outline
   * width
   */
  left: -3px;
  font-size: 0.75em;
  line-height: 2em;
  border-radius: 0.5em;
  display: flex;
  /**
   * So that inner Preset design shows within the rounded corners.
   */
  overflow: clip;
  transition: opacity 200ms;
  outline: 1px solid white;
  .--dragging & {
    opacity: 0;
  }
`

export const $ImageResizePreset = styled("div", forwardRef)`
  padding: 0 0.625em;
  &:last-child {
    border-right: none;
  }
  cursor: pointer;

  /**
   * We don't want it to wrap
   */
  white-space: nowrap;

  /**
   * Preset default colors
   */
  color: var(--shade-600);
  background: var(--shade-200);
  border-right: 1px solid var(--shade-100);
  /**
   * When preset is disabled, it is lighter in color and with elss contrast.
   */
  &.--disabled {
    cursor: default;
    color: var(--shade-300);
    background: var(--shade-100);
    &:hover {
      color: var(--shade-300);
      background: var(--shade-100);
    }
  }
  /**
   * On hover, it is dark, and with higher contrast.
   */
  &:hover {
    color: var(--shade-100);
    background: var(--shade-400);
  }
`
