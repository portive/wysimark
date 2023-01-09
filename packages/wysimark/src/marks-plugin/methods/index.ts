import { Editor } from "slate"

import { curryOne } from "~/src/sink"

import { toggleMark } from "./toggle-mark"

export function createMarksMethods(editor: Editor) {
  return {
    toggleMark: curryOne(toggleMark, editor),
    toggleBold: () => toggleMark(editor, "bold"),
    toggleItalic: () => toggleMark(editor, "italic"),
    toggleUnderline: () => toggleMark(editor, "underline"),
    toggleSup: () => toggleMark(editor, "sup", "sub"),
    toggleSub: () => toggleMark(editor, "sub", "sup"),
    toggleStrike: () => toggleMark(editor, "strike"),
  }
}
