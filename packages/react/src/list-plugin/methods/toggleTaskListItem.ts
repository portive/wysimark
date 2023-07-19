import { Editor, Transforms } from "slate"

import { BetterAt, findElementUp } from "~/src/sink"

import { TaskListItemElement } from "../types"

export function toggleTaskListItem(
  editor: Editor,
  { at = editor.selection }: { at?: BetterAt } = {}
) {
  const taskListItem = findElementUp<TaskListItemElement>(
    editor,
    "task-list-item",
    { at }
  )
  if (!taskListItem) return false
  const nextChecked = !taskListItem[0].checked
  Transforms.setNodes<TaskListItemElement>(
    editor,
    { checked: nextChecked },
    { at: taskListItem[1] }
  )
}
