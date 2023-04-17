import * as Icon from "../icons"
import { Item } from "../types"

export const codeBlockItems: Item[] = [
  {
    icon: Icon.BulletList,
    title: "Plain text",
    action: (editor) => editor.codeBlock.createCodeBlock({ language: "text" }),
  },
  {
    icon: Icon.BulletList,
    title: "HTML, SVG, XML",
    action: (editor) =>
      editor.codeBlock.createCodeBlock({ language: "markup" }),
  },
  {
    icon: Icon.BulletList,
    title: "CSS",
    action: (editor) => editor.codeBlock.createCodeBlock({ language: "css" }),
  },
  {
    icon: Icon.BulletList,
    title: "Javascript",
    action: (editor) =>
      editor.codeBlock.createCodeBlock({ language: "javascript" }),
  },
  {
    icon: Icon.BulletList,
    title: "Java, C, C++",
    action: (editor) => editor.codeBlock.createCodeBlock({ language: "clike" }),
  },
]
