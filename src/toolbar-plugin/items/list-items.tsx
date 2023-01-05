import * as Icon from "../icons"
import { Item } from "../types"

export const listItems: Item[] = [
  {
    icon: Icon.BulletList,
    title: "Bullet List",
    action: (editor) => editor.list.toggleUnorderedList(),
  },
  {
    icon: Icon.ListNumbers,
    title: "Numbered List",
    action: (editor) => editor.list.toggleOrderedList(),
  },
  {
    icon: Icon.ListCheck,
    title: "Checklist",
    action: (editor) => editor.list.toggleTaskList(),
  },
]
