import * as Icon from "../icons"
import { Item } from "../types"

export const headingItems: Item[] = [
  {
    icon: Icon.H1,
    title: "Heading 1",
    hotkey: "super+1",
    action: (editor) => editor.heading.toggleHeading(1),
  },
  {
    icon: Icon.H2,
    title: "Heading 2",
    hotkey: "super+2",
    action: (editor) => editor.heading.toggleHeading(2),
  },
  {
    icon: Icon.H3,
    title: "Heading 3",
    hotkey: "super+3",
    action: (editor) => editor.heading.toggleHeading(3),
  },
  {
    icon: Icon.H4,
    title: "Heading 4",
    hotkey: "super+4",
    action: (editor) => editor.heading.toggleHeading(4),
  },
  {
    icon: Icon.H5,
    title: "Heading 5",
    hotkey: "super+5",
    action: (editor) => editor.heading.toggleHeading(5),
  },
  {
    icon: Icon.H6,
    title: "Heading 6",
    hotkey: "super+6",
    action: (editor) => editor.heading.toggleHeading(1),
  },
  "divider",
  {
    icon: Icon.Paragraph,
    title: "Paragraph",
    hotkey: "super+0",
    action: () => {
      console.log("Set Paragraph")
    },
  },
]
