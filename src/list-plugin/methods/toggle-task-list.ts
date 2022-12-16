import { Editor } from "slate"

import { toggleElements } from "~/src/sink"

import { TaskListItemElement } from ".."

export function toggleTaskList(editor: Editor) {
  return toggleElements<TaskListItemElement>(
    editor,
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
