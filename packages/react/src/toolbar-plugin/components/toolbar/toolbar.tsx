import throttle from "lodash.throttle"
import { useEffect, useRef, useState } from "react"
import { useSlateStatic } from "slate-react"

import { MenuItemData } from "../../../shared-overlays/types"
import { initialItems, itemSets } from "../../items"
import {
  $Toolbar,
  $ToolbarContainer,
  $ToolbarDivider,
  $ToolbarDividerContainer,
} from "../../styles"
import { ToolbarButton } from "./toolbar-button"

/**
 * Render a toolbar item which is either a button or a divider.
 */
function ToolbarItem({ item }: { item: MenuItemData }) {
  const editor = useSlateStatic()
  if (item === "divider") {
    return (
      <$ToolbarDividerContainer data-item-type="divider">
        <$ToolbarDivider />
      </$ToolbarDividerContainer>
    )
  }
  const show = item.show === undefined ? true : item.show(editor)
  if (!show) return null
  return <ToolbarButton item={item} />
}

/**
 * Returns the width of the toolbar, the width of a button, and the width of a
 * divider.
 */
function getWidths(toolbar: HTMLDivElement) {
  const button = toolbar.querySelector<HTMLDivElement>(
    "[data-item-type=button]"
  )
  const divider = toolbar.querySelector<HTMLDivElement>(
    "[data-item-type=divider]"
  )
  if (!button || !divider) throw new Error("Button or divider not found")
  return {
    toolbar: toolbar.offsetWidth,
    button: button.offsetWidth,
    divider: divider.offsetWidth,
  }
}

/**
 * Takes an array of items representing a set of toolbar buttons and items and
 * returns the width of the set in pixels
 */
function measureItemSetWidth(
  items: MenuItemData[],
  buttonWidth: number,
  dividerWidth: number
): number {
  let width = 0
  for (const item of items) {
    width += item === "divider" ? dividerWidth : buttonWidth
  }
  return width
}

export function Toolbar() {
  const ref = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState<MenuItemData[]>(initialItems)
  useEffect(() => {
    const refresh = throttle(
      () => {
        const toolbar = ref.current
        if (!toolbar) throw new Error("Toolbar not found")
        const widths = getWidths(toolbar)
        /**
         * Iterate through the item sets and find the first one that fits within
         * the toolbar width. If none fit, use the last item set.
         */
        for (let i = 0; i < itemSets.length - 1; i++) {
          const itemSetWidth = measureItemSetWidth(
            itemSets[i],
            widths.button,
            widths.divider
          )
          if (itemSetWidth < widths.toolbar) {
            setItems(itemSets[i])
            return
          }
        }
        setItems(itemSets[itemSets.length - 1])
      },
      100,
      { trailing: true }
    )
    refresh()
    window.addEventListener("resize", refresh)
    return () => {
      window.removeEventListener("resize", refresh)
    }
  }, [])
  return (
    <$ToolbarContainer ref={ref}>
      <$Toolbar>
        {items.map((item, index) => (
          <ToolbarItem
            key={typeof item === "string" ? index : item.title}
            item={item}
          />
        ))}
      </$Toolbar>
    </$ToolbarContainer>
  )
}
