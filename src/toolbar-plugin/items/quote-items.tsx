import * as Icon from "../icons"
import { Item } from "../types"

export const quoteItems: Item[] = [
  {
    icon: Icon.Quote,
    title: "Add Block Quote",
    action: (editor) => editor.blockQuotePlugin.indent(),
  },
  {
    icon: Icon.QuoteOff,
    title: "Remove Block Quote",
    action: (editor) => editor.blockQuotePlugin.outdent(),
  },
]
