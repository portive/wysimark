import { Layers } from "~/src/layer"

import * as Icon from "../icons"
import { items } from "../items"
import { $Divider, $Toolbar } from "../styles/styles"
import { Item } from "../types"
import { Button } from "./button"

function ToolbarItem({ item }: { item: Item }) {
  if (item === "divider") {
    return <$Divider />
  } else {
    return (
      <Button item={item}>
        <item.icon />
        {item.more ? <Icon.More /> : null}
      </Button>
    )
  }
}

export function Toolbar() {
  return (
    <Layers>
      <$Toolbar>
        {items.map((item, index) => (
          <ToolbarItem key={index} item={item} />
        ))}
      </$Toolbar>
    </Layers>
  )
}
