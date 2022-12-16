import { Editor } from "slate"

import { curry, toggle, transformNodes } from "~/src/sink"

import {
  isListItem,
  ListItemElement,
  OrderedListItemElement,
  TaskListItemElement,
  UnorderedListItemElement,
} from ".."

export function createListMethods(editor: Editor) {
  return {
    indent: curry(indent, editor),
    outdent: curry(outdent, editor),
    toggleUnorderedList: curry(toggleUnorderedList, editor),
    toggleOrderedList: curry(toggleOrderedList, editor),
    toggleTaskList: curry(toggleTaskList, editor),
  }
}

function toggleOrderedList(editor: Editor) {
  return toggle<OrderedListItemElement>(
    editor,
    (element) => element.type === "ordered-list-item",
    (element) => {
      return {
        type: "ordered-list-item",
        depth: "depth" in element ? element.depth : 0,
      }
    }
  )
}

function toggleUnorderedList(editor: Editor) {
  return toggle<UnorderedListItemElement>(
    editor,
    (element) => element.type === "unordered-list-item",
    (element) => {
      return {
        type: "unordered-list-item",
        depth: "depth" in element ? element.depth : 0,
      }
    }
  )
}

function toggleTaskList(editor: Editor) {
  return toggle<TaskListItemElement>(
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

function indent(editor: Editor) {
  return transformNodes<ListItemElement>(editor, {
    match: isListItem,
    convert: (node) => ({ depth: node.depth + 1 }),
  })
}

function outdent(editor: Editor) {
  const entries = Editor.nodes<ListItemElement>(editor, {
    match: isListItem,
  })
  /**
   * Don't allow `shift+tab` if any of the list items are already at a
   * depth of `0`
   */
  for (const entry of entries) {
    if (entry[0].depth === 0) return true
  }
  return transformNodes<ListItemElement>(editor, {
    match: isListItem,
    convert: (node) => ({ depth: Math.max(0, node.depth - 1) }),
  })
}
