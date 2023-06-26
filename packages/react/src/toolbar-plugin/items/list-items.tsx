import { MenuItemData } from "~/src/shared-overlays"

import * as Icon from "../icons"

export const listItems: MenuItemData[] = [
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
