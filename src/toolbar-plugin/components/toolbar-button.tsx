import { clsx } from "clsx"
import { MouseEvent, useCallback, useEffect, useRef } from "react"

import { useLayer } from "../../layer"
import * as Icon from "../icons"
import { $ToolbarButton } from "../styles"
import { Item } from "../types"
import { Menu } from "./menu"
import { Tooltip } from "./tooltip"

const debug = false

export function ToolbarButton({
  active,
  item,
}: {
  active?: boolean
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
    <$ToolbarButton
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={tooltip.close}
      onClick={onClick}
      className={clsx({ "--active": active })}
    >
      <item.icon />
      {item.more ? <Icon.More /> : null}
    </$ToolbarButton>
  )
}
