import { Editor } from "slate"

import { TaskListItemElement } from ".."

export function toggleTaskList(editor: Editor) {
  return editor.toggle.toggleElements<TaskListItemElement>(
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
