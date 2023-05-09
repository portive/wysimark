import styled from "@emotion/styled"

export const $ImageSizeStatus = styled("span")`
  position: absolute;
  /**
   * The status appears with a 1px gap from the outline.
   *
   * - 1px for gap from image to outline
   * - 2px for outline width
   * - 1px more for the space to the status
   */
  bottom: calc(-2em - 4px);
  left: 0;
  font-size: 0.625em; /* 10px tiny */
  line-height: 2em;
  padding: 0 0.5em;
  color: var(--shade-100);
  background: var(--shade-600);
  outline: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 0.5em;
  white-space: nowrap;

  /* force numbers to be monospaced for better alignment */
  font-variant-numeric: tabular-nums;
`
