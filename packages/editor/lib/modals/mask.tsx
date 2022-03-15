import React, { useRef } from "react"
import { useInModal } from "~/lib/modal"
import styled from "@emotion/styled"

const $Mask = styled.div`
  position: fixed;
  user-select: none;
  /* background: rgba(0, 0, 0, 0.5); */
  /* background: rgba(127, 127, 127, 0.5); */
  /* background: #80808040; */
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  min-width: 10rem;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
`

function Mask({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const modal = useInModal()
  function close(e: { target: any }) {
    if (ref.current === e.target) {
      modal.close()
    }
  }
  return (
    <$Mask ref={ref} onClick={close} style={{ zIndex: modal.zIndex }}>
      {children}
    </$Mask>
  )
}

export { Mask }
