import { clsx } from "clsx"
import { MouseEvent, useCallback, useRef } from "react"
import { ReactEditor, useSlateStatic } from "slate-react"

import { formatHotkey, Menu, MenuItemData } from "~/src/shared-overlays"
import { useLayer } from "~/src/use-layer"
import { useTooltip } from "~/src/use-tooltip"

import * as Icon from "../../icons"
import { $ToolbarButton } from "../../styles"

export function ToolbarButton({
  active,
  item,
}: {
  active?: boolean
  item: Exclude<MenuItemData, "divider">
}) {
  const editor = useSlateStatic()
  const ref = useRef<HTMLDivElement>(null)
  const tooltip = useTooltip({
    title: item.title,
    hotkey: () => (item.hotkey ? formatHotkey(item.hotkey) : undefined),
  })
  const menuLayer = useLayer("menu")

  const openMenu = useCallback(() => {
    const dest = ref.current
    const items = item.children
    const Component = item.Component
    if (!dest) return
    if (items) {
      menuLayer.open(() => (
        <Menu dest={dest} items={items} close={menuLayer.close} />
      ))
    } else if (Component) {
      menuLayer.open(() => <Component dest={dest} close={menuLayer.close} />)
    }
  }, [item])

  const onClick = useCallback(() => {
    if (item.action) {
      item.action(editor)
      ReactEditor.focus(editor)
      return
    }
    if (menuLayer.layer) {
      menuLayer.close()
    } else {
      openMenu()
    }
  }, [menuLayer.layer, item])

  /**
   * On hover
   */
  const onMouseEnter = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      tooltip.onMouseEnter(e)
      /**
       * If any `menu` is already open, then we open up the currently hovered
       * `menu` automatically. This replicates behavior in menus in windowing
       * systems.
       */
      if (menuLayer.layer) openMenu()
    },
    [menuLayer.layer]
  )

  return (
    <$ToolbarButton
      data-item-type="button"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={tooltip.onMouseLeave}
      onClick={onClick}
      className={clsx({ "--active": active, "--more": item.more })}
    >
      <item.icon />
      {item.more ? <Icon.More /> : null}
    </$ToolbarButton>
  )
}
