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
  return (
    <$Toolbar>
      {items.map((item, index) => (
        <ToolbarItem key={index} item={item} />
      ))}
    </$Toolbar>
  )
}
