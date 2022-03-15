import * as Custom from "../custom"
import { createKeyDownHandler } from "./create-key-down-handler"

export const handleKeyDownCore = createKeyDownHandler({
  "shift+enter"(editor) {
    Custom.insertNewline(editor)
    return true
  },
  tab(editor) {
    Custom.tabInList(editor, 1)
    return true
  },
  "shift+tab"(editor) {
    Custom.tabInList(editor, -1)
    return true
  },
  "mod+b"(editor) {
    Custom.toggleMark(editor, "bold", true)
    return true
  },
  "mod+i"(editor) {
    Custom.toggleMark(editor, "italic", true)
    return true
  },
  "mod+j"(editor) {
    Custom.toggleMark(editor, "code", true)
    return true
  },
  "mod+d"(editor) {
    Custom.toggleMark(editor, "code", true)
    return true
  },
  "super+c"(editor) {
    Custom.toggleMark(editor, "code", true)
    return true
  },
  "super+-"(editor) {
    Custom.insertHorizontalRule(editor)
    return true
  },
  "super+p"(editor) {
    Custom.toggleMark(editor, "sup", true)
    return true
  },
  "super+b"(editor) {
    Custom.toggleMark(editor, "sub", true)
    return true
  },
  "super+x"(editor) {
    Custom.toggleMark(editor, "del", true)
    return true
  },
  "super+0"(editor) {
    Custom.setParagraph(editor)
    return true
  },
  "super+1"(editor) {
    Custom.toggleHeading(editor, 1)
    return true
  },
  "super+2"(editor) {
    Custom.toggleHeading(editor, 2)
    return true
  },
  "super+3"(editor) {
    Custom.toggleHeading(editor, 3)
    return true
  },
  "super+4"(editor) {
    Custom.toggleHeading(editor, 4)
    return true
  },
  "super+5"(editor) {
    Custom.toggleHeading(editor, 5)
    return true
  },
  "super+6"(editor) {
    Custom.toggleHeading(editor, 6)
    return true
  },
  "super+7"(editor) {
    Custom.toggleListItem(editor, "ordered-list-item")
    return true
  },
  "super+8"(editor) {
    Custom.toggleListItem(editor, "unordered-list-item")
    return true
  },
  "super+9"(editor) {
    Custom.toggleListItem(editor, "task-list-item")
    return true
  },
})
