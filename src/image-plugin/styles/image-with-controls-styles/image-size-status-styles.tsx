import { styled } from "goober"
import { forwardRef } from "react"

export const $ImageSizeStatus = styled("div", forwardRef)`
  position: absolute;
  bottom: 4px;
  .--small > & {
    bottom: calc(-2em - 4px);
  }
  transition: bottom 250ms;
  left: 4px;
  font-size: 0.625em;
  line-height: 2em;
  padding: 0 0.5em;
  color: white;
  background: #404040;
  outline: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 0.5em;
  white-space: nowrap;

  /* force numbers to be monospaced for better alignment */
  font-variant-numeric: tabular-nums;
`
