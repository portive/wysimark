import { styled } from "goober"
import { forwardRef } from "react"

export const $CloseMask = styled("div", forwardRef)`
  position: fixed;
  user-select: none;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.01);
`
