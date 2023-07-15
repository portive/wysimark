import { MenuItemData } from "~/src/shared-overlays"

import { TableDialog } from "../components"
import { EmojiDialog } from "../components/dialog/emoji-dialog"
import { AttachmentDialog, ImageDialog } from "../components/dialog/file-dialog"
import * as Icon from "../icons"

export const dialogItems: MenuItemData[] = [
  {
    icon: Icon.Table,
    title: "Insert Table",
    more: true,
    Component: TableDialog,
  },
  {
    icon: Icon.Image,
    title: "Insert Image",
    more: true,
    Component: ImageDialog,
    show: (editor) => editor.toolbar.showUploadButtons ?? false,
  },
  {
    icon: Icon.Attachment,
    title: "Insert Attachment",
    more: true,
    Component: AttachmentDialog,
    show: (editor) => editor.toolbar.showUploadButtons ?? false,
  },
  {
    icon: Icon.Emoji,
    title: "Insert Emoji",
    more: true,
    Component: EmojiDialog,
  },
]

export const expandedDialogItems: MenuItemData[] = dialogItems

export const compactDialogItems: MenuItemData[] = [
  {
    icon: Icon.Plus,
    title: "Insert",
    more: true,
    children: dialogItems,
  },
]
