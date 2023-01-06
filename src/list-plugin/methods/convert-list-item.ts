import { Editor } from "slate"

import {
  OrderedListItemElement,
  TaskListItemElement,
  UnorderedListItemElement,
} from ".."

export function convertOrderedList(editor: Editor, allowToggle: boolean) {
  return editor.convertElement.convertElements<OrderedListItemElement>(
    (element) => element.type === "ordered-list-item",
    (element) => {
      return {
        type: "ordered-list-item",
        depth: "depth" in element ? element.depth : 0,
      }
    },
    allowToggle
  )
}

export function convertTaskList(editor: Editor, allowToggle: boolean) {
  return editor.convertElement.convertElements<TaskListItemElement>(
    (element) => element.type === "task-list-item",
    (element) => {
      return {
        type: "task-list-item",
        checked: "checked" in element ? element.checked : false,
        depth: "depth" in element ? element.depth : 0,
      }
    },
    allowToggle
  )
}

export function convertUnorderedList(editor: Editor, allowToggle: boolean) {
  return editor.convertElement.convertElements<UnorderedListItemElement>(
    (element) => element.type === "unordered-list-item",
    (element) => {
      return {
        type: "unordered-list-item",
        depth: "depth" in element ? element.depth : 0,
      }
    },
    allowToggle
  )
}
