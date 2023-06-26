import { MenuItemData } from "~/src/shared-overlays"

import * as Icon from "../icons"

export const quoteItems: MenuItemData[] = [
  {
    icon: Icon.Quote,
    title: "Add Block Quote",
    hotkey: "super+.",
    action: (editor) => editor.blockQuotePlugin.indent(),
  },
  {
    icon: Icon.QuoteOff,
    title: "Remove Block Quote",
    hotkey: "super+,",
    action: (editor) => editor.blockQuotePlugin.outdent(),
  },
]
