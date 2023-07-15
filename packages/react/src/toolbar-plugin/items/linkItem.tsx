import { MenuItemData } from "~/src/shared-overlays"

import { AnchorDialog } from "../components/dialog/anchor-dialog"
import * as Icon from "../icons"

export const linkItem: MenuItemData = {
  icon: Icon.Link,
  title: "Insert Link",
  more: true,
  hotkey: "mod+k",
  Component: AnchorDialog,
}
