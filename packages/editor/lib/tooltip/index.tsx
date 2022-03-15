import React from "react"
import { ModalType, useModal } from "~/lib/modal"
import { Callout } from "./callout"

function Tooltip({
  children,
  hotkey,
  label,
}: {
  children: React.ReactElement
  hotkey?: string
  label: React.ReactNode
}) {
  const modal = useModal(ModalType.Tooltip)
  function openTooltip(e: { currentTarget: HTMLElement }) {
    modal.open(Callout, { dest: e.currentTarget, hotkey, label })
  }
  function closeTooltip() {
    modal.close()
  }
  return React.cloneElement(children, {
    onMouseDown: (e: any) => {
      closeTooltip()
      children.props.onMouseDown(e)
    },
    onMouseMove: openTooltip,
    onMouseLeave: closeTooltip,
    onMouseUp: closeTooltip,
  })
}

export { Tooltip }
