import { MenuItemData } from "~/src/shared-overlays"

import * as Icon from "../icons"

const primaryMarkItems: MenuItemData[] = [
  {
    icon: Icon.Bold,
    title: "Bold",
    hotkey: "mod+b",
    action: (editor) => editor.marksPlugin.toggleBold(),
  },
  {
    icon: Icon.Italic,
    title: "Italic",
    hotkey: "mod+i",
    action: (editor) => editor.marksPlugin.toggleItalic(),
  },
]

const secondaryMarkItems: MenuItemData[] = [
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
    action: (editor) => editor.marksPlugin.toggleStrike(),
  },
  "divider",
  {
    icon: Icon.Code,
    title: "Inline Code",
    hotkey: "mod+j",
    action: (editor) => editor.inlineCode.toggleInlineCode(),
  },
  "divider",
  {
    icon: Icon.RemoveStyles,
    title: "Remove Styles",
    hotkey: "super+0",
    /**
     * TODO: Enable remove styles
     */
    action: (editor) => editor.marksPlugin.removeMarks(),
  },
]

export const expandedMarkItems: MenuItemData[] = [
  ...primaryMarkItems,
  {
    icon: Icon.Style,
    title: "Text Style",
    more: true,
    children: secondaryMarkItems,
  },
]

export const compactMarkItems: MenuItemData[] = [
  {
    icon: Icon.Style,
    title: "Text Style",
    more: true,
    children: [...primaryMarkItems, "divider", ...secondaryMarkItems],
  },
]
