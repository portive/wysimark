import { MenuItemData } from "~/src/shared-overlays"

import * as Icon from "../icons"
import { codeBlockItems } from "./codeBlockItems"
import { listItems } from "./list-items"
import { quoteItems } from "./quote-items"

export const dropdownItems: MenuItemData[] = [
  {
    icon: Icon.BulletList,
    title: "Lists",
    more: true,
    children: listItems,
  },
  {
    icon: Icon.Blockquote,
    title: "Block Quote",
    more: true,
    children: quoteItems,
  },
  {
    icon: Icon.Code,
    title: "Code Block",
    more: true,
    children: codeBlockItems,
  },
]
