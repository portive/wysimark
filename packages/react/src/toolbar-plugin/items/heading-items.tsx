import { MenuItemData } from "~/src/shared-overlays/types"

import * as Icon from "../icons"

export const headingItems: MenuItemData[] = [
  {
    icon: Icon.H1,
    title: "Heading 1",
    hotkey: "super+1",
    action: (editor) => editor.heading.convertHeading(1, false),
  },
  {
    icon: Icon.H2,
    title: "Heading 2",
    hotkey: "super+2",
    action: (editor) => editor.heading.convertHeading(2, false),
  },
  {
    icon: Icon.H3,
    title: "Heading 3",
    hotkey: "super+3",
    action: (editor) => editor.heading.convertHeading(3, false),
  },
  {
    icon: Icon.H4,
    title: "Heading 4",
    hotkey: "super+4",
    action: (editor) => editor.heading.convertHeading(4, false),
  },
  {
    icon: Icon.H5,
    title: "Heading 5",
    hotkey: "super+5",
    action: (editor) => editor.heading.convertHeading(5, false),
  },
  {
    icon: Icon.H6,
    title: "Heading 6",
    hotkey: "super+6",
    action: (editor) => editor.heading.convertHeading(1, false),
  },
  "divider",
  {
    icon: Icon.Paragraph,
    title: "Paragraph",
    hotkey: "super+0",
    action: (editor) => {
      editor.collapsibleParagraph.convertParagraph()
    },
  },
]
