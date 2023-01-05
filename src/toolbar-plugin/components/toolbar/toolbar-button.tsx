import { clsx } from "clsx"
import { MouseEvent, useCallback, useEffect, useRef } from "react"
import { ReactEditor, useSlateStatic } from "slate-react"

import { useLayer } from "../../../use-layer"
import * as Icon from "../../icons"
import { $ToolbarButton } from "../../styles"
import { Item } from "../../types"
import { Menu } from "../menu/menu"
import { Tooltip } from "./tooltip"

const debug = false

export function ToolbarButton({
  active,
  item,
}: {
  active?: boolean
  item: Exclude<Item, "divider">
}) {
  const editor = useSlateStatic()
  const ref = useRef<HTMLDivElement>(null)
  const tooltip = useLayer("tooltip")
  const menu = useLayer("menu")

  const openMenu = useCallback(() => {
    const dest = ref.current
    const items = item.children
    const Component = item.Component
    if (!dest) return
    if (items) {
      menu.open(() => <Menu dest={dest} items={items} close={menu.close} />)
    } else if (Component) {
      menu.open(() => <Component dest={dest} close={menu.close} />)
    }
  }, [item])

  const onClick = useCallback(() => {
    if (item.action) {
      item.action(editor)
      ReactEditor.focus(editor)
      return
    }
    if (menu.layer) {
      menu.close()
    } else {
      openMenu()
    }
  }, [menu.layer, item])

  /**
   * On hover
   */
  const onMouseEnter = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const title = item.title
      const hotkey = item.hotkey
      const dest = e.currentTarget
      /**
       * Open tooltip
       */
      if (title !== undefined) {
        tooltip.open(() => (
          <Tooltip title={title} hotkey={hotkey} dest={dest} />
        ))
      }
      /**
       * If any `menu` is already open, then we open up the currently hovered
       * `menu` automatically. This replicates behavior in menus in windowing
       * systems.
       */
      if (menu.layer) openMenu()
    },
    [menu.layer]
  )

  /**
   * DEBUG:
   *
   * Immediately open the menu so we can view it while playing with it when
   * `debug` is true.
   */
  useEffect(() => {
    if (debug) {
      openMenu()
      const dest = ref.current
      if (!dest) return
      tooltip.open(() => (
        <Tooltip title={"Bold"} hotkey={"mod+b"} dest={dest} />
      ))
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
