import { clsx } from "clsx"
import { MouseEvent, useCallback } from "react"

import { useModal } from "../modal"
import { $Button } from "./styles"

export function Button({
  active,
  children,
  title,
}: {
  active?: boolean
  children: React.ReactNode
  title?: string
}) {
  // const tooltip = useModal("tooltip", Tooltip)

  // const openTooltip = useCallback((e: MouseEvent<HTMLDivElement>) => {
  //   if (typeof title === "undefined") return
  //   tooltip.open({ title, dest: e.currentTarget })
  // }, [])

  return (
    <$Button
      // onMouseEnter={openTooltip}
      // onMouseLeave={tooltip.close}
      className={clsx({ "--active": active })}
    >
      {children}
    </$Button>
  )
}

function useRect(dest: HTMLElement): DOMRect {
  return dest.getBoundingClientRect()
}

function Tooltip({ title, dest }: { title: string; dest: HTMLElement }) {
  const rect = useRect(dest)
  return (
    <div
      style={{
        position: "absolute",
        left: rect.left,
        top: rect.bottom,
        background: "orange",
        zIndex: 10,
      }}
    >
      {title}
    </div>
  )
}
