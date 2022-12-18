import * as Icon from "../icons"
import { Item } from "../types"

export const styleItems: Item[] = [
  { icon: Icon.Superscript, title: "Superscript", hotkey: "super+p" },
  { icon: Icon.Subscript, title: "Subscript", hotkey: "super+b" },
  "divider",
  { icon: Icon.Strikethrough, title: "Strikethrough", hotkey: "super+k" },
  "divider",
  { icon: Icon.Code, title: "Inline Code", hotkey: "mod+j" },
  "divider",
  { icon: Icon.RemoveStyles, title: "Remove Styles", hotkey: "super+0" },
]
