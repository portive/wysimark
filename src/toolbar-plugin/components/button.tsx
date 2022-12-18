import { clsx } from "clsx"
import { MouseEvent, useCallback, useEffect, useRef } from "react"

import { useLayer } from "../../layer"
import { $Button } from "../styles/styles"
import { Item } from "../types"
import { Menu } from "./menu"
import { Tooltip } from "./tooltip"

export function Button({
  active,
  children,
  item,
}: {
  active?: boolean
  children: React.ReactNode
  item: Exclude<Item, "divider">
}) {
  const tooltip = useLayer("tooltip", Tooltip)

  const openMenu = useCallback((e: MouseEvent<HTMLElement>) => {
    if (item.children === undefined) return
    menu.open({ dest: e.currentTarget, items: item.children })
  }, [])

  const openTooltip = useCallback((e: MouseEvent<HTMLElement>) => {
    openMenu(e)
    if (item.title === undefined) return
    tooltip.open({ title: item.title, dest: e.currentTarget })
  }, [])

  const menu = useLayer("menu", Menu)

  const ref = useRef<HTMLDivElement>(null)

  /**
   * TEMPORARY:
   *
   * Immediately open the menu so we can view it while playing with it.
   */
  useEffect(() => {
    if (item.children === undefined) return
    if (ref.current === null) return
    menu.open({ dest: ref.current, items: item.children })
  }, [])

  return (
    <$Button
      ref={ref}
      onMouseEnter={openTooltip}
      onMouseLeave={tooltip.close}
      onClick={openMenu}
      className={clsx({ "--active": active })}
    >
      {children}
    </$Button>
  )
}
