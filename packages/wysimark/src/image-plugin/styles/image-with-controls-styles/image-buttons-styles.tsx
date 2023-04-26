import styled from "@emotion/styled"

/**
 * Styling for a collection of buttons in the $ImageButtonsContainer at the top
 * of the image.
 */
export const $ImageButtonGroup = styled("span")`
  /* font-size: 0.75em; */
  border-radius: 0.5em;
  display: flex;
  /**
   * So that inner Preset design shows within the rounded corners.
   */
  overflow: clip;
  /**
   * Let's the menu pop a little over other content. Without it, may be able to
   * see the border of the buttons.
   */
  outline: 1px solid white;
`

export const $ImageButton = styled("span")`
  font-size: 0.75em;
  line-height: 2em;
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
  &.--selected {
    cursor: default;
    color: var(--blue-700);
    background: var(--blue-200);
    &:hover {
      color: var(--blue-700);
      background: var(--blue-200);
    }
  }
  /**
   * On hover, it is dark, and with higher contrast.
   */
  &:hover {
    color: var(--shade-700);
    background: var(--shade-300);
  }
  svg {
    position: relative;
    top: 0.25em;
    font-size: 1.33em;
    line-height: 1em;
  }
`
