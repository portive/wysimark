import * as Icon from "../icons"
import { Item } from "../types"

export const styleItems: Item[] = [
  {
    icon: Icon.Superscript,
    title: "Superscript",
    hotkey: "super+p",
    action: (editor) => editor.marksPlugin.toggleSup(),
  },
  {
    icon: Icon.Subscript,
    title: "Subscript",
    hotkey: "super+b",
    action: (editor) => editor.marksPlugin.toggleSub(),
  },
  "divider",
  {
    icon: Icon.Strikethrough,
    title: "Strikethrough",
    hotkey: "super+k",
    // action: (editor) => editor.marksPlugin.togg(),
  },
  "divider",
  {
    icon: Icon.Code,
    title: "Inline Code",
    hotkey: "mod+j",
    action: (editor) => editor.inlineCode.toggleInlineCode(),
  },
  "divider",
  { icon: Icon.RemoveStyles, title: "Remove Styles", hotkey: "super+0" },
]
