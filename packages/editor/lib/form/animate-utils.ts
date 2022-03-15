import { css } from "@emotion/core"

export const initialStyles = css`
  &.--initial {
    opacity: 0;
    transform: translateY(-4px);
  }
  opacity: 1;
  transform: translateY(0);
  /**
   * Looks better when the element appears a little before movement has stopped.
   */
  transition: opacity linear 100ms, transform linear 150ms;
`
