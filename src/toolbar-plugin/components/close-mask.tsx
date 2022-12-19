import { styled } from "goober"
import React, { forwardRef, useRef } from "react"

const $Mask = styled("div", forwardRef)`
  position: fixed;
  user-select: none;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.01);
`

export function CloseMask({ close }: { close: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  return <$Mask ref={ref} onClick={close} />
}
