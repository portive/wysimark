import { clsx } from "clsx"
import { styled } from "goober"
import { forwardRef, MouseEvent, useCallback } from "react"

import { useModal } from "../modal"
import { $Button } from "./styles"
import { Tooltip } from "./tooltip"

export function Button({
  active,
  children,
  title,
}: {
  active?: boolean
  children: React.ReactNode
  title?: string
}) {
  const tooltip = useModal("tooltip", Tooltip)

  const openTooltip = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (typeof title === "undefined") return
    tooltip.open({ title, dest: e.currentTarget })
  }, [])

  return (
    <$Button
      onMouseEnter={openTooltip}
      onMouseLeave={tooltip.close}
      className={clsx({ "--active": active })}
    >
      {children}
    </$Button>
  )
}
