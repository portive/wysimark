import { clsx } from "clsx"
import { MouseEvent, useCallback, useEffect, useRef } from "react"

import { useLayer } from "../../layer"
import { $Button } from "../styles/styles"
import { Item } from "../types"
import { Menu } from "./menu"
import { Tooltip } from "./tooltip"

const debug = false

export function Button({
  active,
  children,
  item,
}: {
  active?: boolean
  children: React.ReactNode
  item: Exclude<Item, "divider">
}) {
  const ref = useRef<HTMLDivElement>(null)
  const tooltip = useLayer("tooltip", Tooltip)
  const menu = useLayer("menu", Menu)

  const onClick = useCallback((e: MouseEvent<HTMLElement>) => {
    if (item.children !== undefined) {
      menu.open({
        dest: e.currentTarget,
        items: item.children,
        close: menu.close,
      })
    } else {
      menu.close()
    }
  }, [])

  const onMouseEnter = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (item.title !== undefined) {
        tooltip.open({ title: item.title, dest: e.currentTarget })
      }
      if (menu.layer && item.children !== undefined) {
        menu.open({
          dest: e.currentTarget,
          items: item.children,
          close: menu.close,
        })
      }
    },
    [menu.layer]
  )

  useEffect(() => {
    /**
     * DEBUG:
     *
     * Immediately open the menu so we can view it while playing with it when
     * `debug` is true.
     */
    if (debug) {
      if (item.children === undefined) return
      if (ref.current === null) return
      menu.open({ dest: ref.current, items: item.children, close: menu.close })
    }
  }, [])

  return (
    <$Button
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={tooltip.close}
      onClick={onClick}
      className={clsx({ "--active": active })}
    >
      {children}
    </$Button>
  )
}
