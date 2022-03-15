import styled from "@emotion/styled"
import { initialStyles } from "./animate-utils"

export const Dialog = styled.div`
  ${initialStyles}
  background: white;
  border-radius: 8px;
  border: 1px solid #dde3e8;
  box-shadow: 0 4px 8px 4px rgba(0, 16, 32, 0.05);
  padding: 30px 0 30px;
  position: relative;

  /**
   * Formatting specifically to work well with modal library
   */
  @media (max-width: 767px) {
    width: calc(100% - 2em);
  }

  /**
   * Give us some extra space at the bottom for the gutter. We can't easily
   * set is in JavaScript because we are using absolute positioning.
   */
  margin-bottom: 1em;

  /**
   * The minimal amount of CSS to force the iPhone to make space underneath
   * the position absolute. To be clear, all of 'width', 'height' and 'content'
   * are required.
   */
  &::after {
    position: absolute;
    content: " ";
    width: 1px;
    height: 1px;
    bottom: -1em;
  }
`
