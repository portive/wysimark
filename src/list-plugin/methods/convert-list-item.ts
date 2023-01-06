import { Editor } from "slate"

import {
  OrderedListItemElement,
  TaskListItemElement,
  UnorderedListItemElement,
} from ".."

export function toggleOrderedList(editor: Editor) {
  return editor.toggleElement.toggleElements<OrderedListItemElement>(
    (element) => element.type === "ordered-list-item",
    (element) => {
      return {
        type: "ordered-list-item",
        depth: "depth" in element ? element.depth : 0,
      }
    }
  )
}

export function toggleTaskList(editor: Editor) {
  return editor.toggleElement.toggleElements<TaskListItemElement>(
    (element) => element.type === "task-list-item",
    (element) => {
      return {
        type: "task-list-item",
        checked: "checked" in element ? element.checked : false,
        depth: "depth" in element ? element.depth : 0,
      }
    }
  )
}

export function toggleUnorderedList(editor: Editor) {
  return editor.toggleElement.toggleElements<UnorderedListItemElement>(
    (element) => element.type === "unordered-list-item",
    (element) => {
      return {
        type: "unordered-list-item",
        depth: "depth" in element ? element.depth : 0,
      }
    }
  )
}
