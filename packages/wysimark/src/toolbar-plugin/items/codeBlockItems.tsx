import { Editor } from "slate"

import { BuiltInLanguage } from "../../code-block-plugin"
import * as Icon from "../icons"
import { Item } from "../types"

function codeBlockAction(language: BuiltInLanguage) {
  return (editor: Editor) =>
    editor.codeBlock.setCodeBlockLanguage(language) ||
    editor.codeBlock.createCodeBlock({ language })
}

export const codeBlockItems: Item[] = [
  {
    icon: Icon.BulletList,
    title: "Plain text",
    action: codeBlockAction("text"),
  },
  "divider",
  {
    icon: Icon.BulletList,
    title: "HTML",
    action: codeBlockAction("html"),
  },
  {
    icon: Icon.BulletList,
    title: "SVG",
    action: codeBlockAction("svg"),
  },
  {
    icon: Icon.BulletList,
    title: "CSS",
    action: codeBlockAction("css"),
  },
  "divider",
  {
    icon: Icon.BulletList,
    title: "Javascript",
    action: codeBlockAction("javascript"),
  },
  {
    icon: Icon.BulletList,
    title: "C Like (C, C#, C++, Java)",
    action: codeBlockAction("clike"),
  },
]
