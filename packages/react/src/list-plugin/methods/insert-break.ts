import { Editor, Transforms } from "slate"

import { findElementUp, rewrapElement } from "~/src/sink"

import { isListItem } from ".."
import { ListItemElement } from "../types"

export function insertBreak(editor: Editor): boolean {
  const entry = findElementUp<ListItemElement>(editor, isListItem)
  if (!entry) return false
  const [element, path] = entry

  /**
   * If we're in an empty list
   */
  if (Editor.isEmpty(editor, element)) {
    if (element.depth > 0) {
      /**
       * If it's indented, then unindent it
       */
      Transforms.setNodes(editor, { depth: element.depth - 1 }, { at: path })
      return true
    } else {
      /**
       * If it's fully unindented, turn it into a paragraph
       */
      rewrapElement(editor, { type: "paragraph" }, path)
      return true
    }
  }
  /**
   * Otherwise perform default insertBreak transform
   */
  Transforms.splitNodes(editor, { always: true })
  /**
   * Then find the list item we are now in
   */
  const nextEntry = findElementUp<ListItemElement>(editor, isListItem)
  if (!nextEntry) return true
  /**
   * And if it's a checked task list that is checked, we want to uncheck it.
   * New list items are by default always unchecked.
   */
  if (nextEntry[0].type === "task-list-item" && nextEntry[0].checked === true) {
    Transforms.setNodes(editor, { checked: false }, { at: nextEntry[1] })
  }
  return true
}
