import * as Icon from "../icons"
import { Item } from "../types"

export const listItems: Item[] = [
  {
    icon: Icon.BulletList,
    title: "Bullet List",
    hotkey: "super+8",
    action: (editor) => editor.list.convertUnorderedList(false),
  },
  {
    icon: Icon.ListNumbers,
    title: "Numbered List",
    hotkey: "super+7",
    action: (editor) => editor.list.convertOrderedList(false),
  },
  {
    icon: Icon.ListCheck,
    title: "Checklist",
    hotkey: "super+9",
    action: (editor) => editor.list.convertTaskList(false),
  },
]
