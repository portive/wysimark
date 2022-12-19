import { TablePanel } from "../components"
import * as Icon from "../icons"
import { Item } from "../types"
import { headingItems } from "./heading-items"
import { listItems } from "./list-items"
import { quoteItems } from "./quote-items"
import { styleItems } from "./style-items"

export const items: Item[] = [
  {
    icon: Icon.H,
    title: "Paragraph Style",
    more: true,
    children: headingItems,
  },
  "divider",
  {
    icon: Icon.Bold,
    title: "Bold",
    hotkey: "mod+b",
    action: (editor) => editor.marksPlugin.toggleBold(),
  },
  {
    icon: Icon.Italic,
    title: "Italic",
    hotkey: "mod+i",
    action: (editor) => editor.marksPlugin.toggleItalic(),
  },
  { icon: Icon.Style, title: "Text Style", more: true, children: styleItems },
  "divider",
  {
    icon: Icon.BulletList,
    title: "Bullet List",
    more: true,
    children: listItems,
  },
  "divider",
  {
    icon: Icon.Table,
    title: "Table",
    more: true,
    Component: TablePanel,
  },
  {
    icon: Icon.Blockquote,
    title: "Block Quote",
    more: true,
    children: quoteItems,
  },
  { icon: Icon.Code, title: "Code Block", more: true },
  "divider",
  {
    icon: Icon.Link,
    title: "Insert Link",
    hotkey: "mod+k",
    action: (editor) =>
      editor.anchor.insertLink("https://www.google.com/", "Google", {
        select: true,
      }),
  },
  { icon: Icon.Image, title: "Insert Image" },
  { icon: Icon.Attachment, title: "Insert Attachment" },
  "divider",
]
