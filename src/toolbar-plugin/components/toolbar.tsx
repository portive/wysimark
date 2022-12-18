import { Layers } from "~/src/layer"

import * as Icon from "../icons"
import { items } from "../items"
import { $Divider, $Toolbar } from "../styles/styles"
import { Item } from "../types"
import { Button } from "./button"

function RenderToolbarItem(item: Item, index: number) {
  if (item === "divider") {
    return <$Divider key={index} />
  } else {
    return (
      <Button key={index} item={item}>
        <item.icon />
        {item.more ? <Icon.More /> : null}
      </Button>
    )
  }
}

export function Toolbar() {
  return (
    <Layers>
      <$Toolbar>{items.map(RenderToolbarItem)}</$Toolbar>
    </Layers>
  )
}
