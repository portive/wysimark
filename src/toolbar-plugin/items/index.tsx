import { TableDialog } from "../components"
import { AnchorDialog } from "../components/dialog/anchor-dialog"
import { EmojiDialog } from "../components/dialog/emoji-dialog"
import * as Icon from "../icons"
import { Item } from "../types"
import { headingItems } from "./heading-items"
import { listItems } from "./list-items"
import { quoteItems } from "./quote-items"
import { styleItems } from "./style-items"

/**
 * A collection of `Item` objects that describe either
 *
 * - A Button in the toolbar
 * - A Menu Item in a drop down of the toolbar
 *
 * An `Item` is described in the same way whether it is a button or a menu
 * item making them interchangeable.
 */
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
    action: (editor) => editor.marks.toggleBold(),
  },
  {
    icon: Icon.Italic,
    title: "Italic",
    hotkey: "mod+i",
    action: (editor) => editor.marks.toggleItalic(),
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
    Component: TableDialog,
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
    // action: (editor) =>
    //   editor.anchor.insertLink("https://www.google.com/", "Google", {
    //     select: true,
    //   }),
    Component: AnchorDialog,
  },
  { icon: Icon.Image, title: "Insert Image" },
  { icon: Icon.Attachment, title: "Insert Attachment" },
  "divider",

  { icon: Icon.Emoji, title: "Insert Emoji", Component: EmojiDialog },
]
