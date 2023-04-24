import { useSlateStatic } from "slate-react"

import { items } from "../../items"
import { $Toolbar, $ToolbarDivider } from "../../styles"
import { Item } from "../../types"
import { ToolbarButton } from "./toolbar-button"

function ToolbarItem({ item }: { item: Item }) {
  if (item === "divider") {
    return <$ToolbarDivider />
  } else {
    return <ToolbarButton item={item} />
  }
}

export function Toolbar() {
  const editor = useSlateStatic()
  return (
    <$Toolbar>
      {items.map((item, index) => {
        const show = item.show === undefined ? true : item.show(editor)
        if (!show) return null
        return <ToolbarItem key={index} item={item} />
      })}
    </$Toolbar>
  )
}
