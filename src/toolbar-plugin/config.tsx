import { Editor } from "slate"

import * as Icon from "./icons"

export type Item =
  | {
      icon: React.FunctionComponent
      title?: string
      action?: (editor: Editor) => void
      more?: boolean
      children?: Item[]
    }
  | "divider"

const headingItems: Item[] = [
  { icon: Icon.H1, title: "Heading 1" },
  { icon: Icon.H2, title: "Heading 2" },
  { icon: Icon.H3, title: "Heading 3" },
  { icon: Icon.H4, title: "Heading 4" },
  { icon: Icon.H5, title: "Heading 5" },
  { icon: Icon.H6, title: "Heading 6" },
  { icon: Icon.Paragraph, title: "Paragraph" },
]

export const items: Item[] = [
  {
    icon: Icon.H,
    title: "Paragraph Style",
    more: true,
    children: headingItems,
  },
  "divider",
  { icon: Icon.Bold, title: "Bold" },
  { icon: Icon.Italic, title: "Italic" },
  { icon: Icon.Style, title: "Text Style", more: true },
  "divider",
  { icon: Icon.BulletList, title: "List", more: true },
  "divider",
  { icon: Icon.Table, title: "Table", more: true },
  { icon: Icon.BlockQuote, title: "Block Quote", more: true },
  { icon: Icon.Code, title: "Code Block", more: true },
  "divider",
  { icon: Icon.Link, title: "Insert Link" },
  { icon: Icon.Image, title: "Insert Image" },
  { icon: Icon.Attachment, title: "Insert Attachment" },
  "divider",
]
