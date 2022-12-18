import * as Icon from "./icons"
import { Item } from "./types"

const headingItems: Item[] = [
  { icon: Icon.H1, title: "Heading 1", hotkey: "super+1" },
  { icon: Icon.H2, title: "Heading 2", hotkey: "super+2" },
  { icon: Icon.H3, title: "Heading 3", hotkey: "super+3" },
  { icon: Icon.H4, title: "Heading 4", hotkey: "super+4" },
  { icon: Icon.H5, title: "Heading 5", hotkey: "super+5" },
  { icon: Icon.H6, title: "Heading 6", hotkey: "super+6" },
  { icon: Icon.Paragraph, title: "Paragraph", hotkey: "super+0" },
]

const styleItems: Item[] = [
  { icon: Icon.Code, title: "Inline Code", hotkey: "mod+j" },
  { icon: Icon.Superscript, title: "Superscript", hotkey: "super+p" },
  { icon: Icon.Subscript, title: "Subscript", hotkey: "super+b" },
  { icon: Icon.Strikethrough, title: "Strikethrough", hotkey: "super+k" },
  { icon: Icon.RemoveStyles, title: "Remove Styles", hotkey: "super+0" },
]

export const items: Item[] = [
  {
    icon: Icon.H,
    title: "Paragraph Style",
    more: true,
    children: headingItems,
  },
  "divider",
  { icon: Icon.Bold, title: "Bold", hotkey: "mod+b" },
  { icon: Icon.Italic, title: "Italic", hotkey: "mod+i" },
  { icon: Icon.Style, title: "Text Style", more: true, children: styleItems },
  "divider",
  { icon: Icon.BulletList, title: "List", more: true },
  "divider",
  { icon: Icon.Table, title: "Table", more: true },
  { icon: Icon.BlockQuote, title: "Block Quote", more: true },
  { icon: Icon.Code, title: "Code Block", more: true },
  "divider",
  { icon: Icon.Link, title: "Insert Link", hotkey: "mod+k" },
  { icon: Icon.Image, title: "Insert Image" },
  { icon: Icon.Attachment, title: "Insert Attachment" },
  "divider",
]
