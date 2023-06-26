import { useSlateStatic } from "slate-react"

import { MenuItemData } from "../../../shared-overlays/types"
import { items } from "../../items"
import { $Toolbar, $ToolbarDivider } from "../../styles"
import { ToolbarButton } from "./toolbar-button"

function ToolbarItem({ item }: { item: MenuItemData }) {
  const editor = useSlateStatic()
  if (item === "divider") {
    return <$ToolbarDivider />
  } else {
    const show = item.show === undefined ? true : item.show(editor)
    if (!show) return null
    return <ToolbarButton item={item} />
  }
}

export function Toolbar() {
  return (
    <$Toolbar>
      {items.map((item, index) => (
        <ToolbarItem key={index} item={item} />
      ))}
    </$Toolbar>
  )
}
