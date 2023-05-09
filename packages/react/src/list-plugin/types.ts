import { Descendant } from "slate"

import { createListMethods } from "./methods"

/**
 * List Editor
 */

export type ListEditor = {
  list: ReturnType<typeof createListMethods>
}

/**
 * Ordered List Item Element
 */

export type OrderedListItemElement = {
  type: "ordered-list-item"
  depth: number
  __firstAtDepth?: boolean // used internally to reset counters
  children: Descendant[]
}

/**
 * Unordered List Item Element
 */

export type UnorderedListItemElement = {
  type: "unordered-list-item"
  depth: number
  __firstAtDepth?: boolean // used internally to reset counters
  children: Descendant[]
}

/**
 * Checkable Task List Item Element
 */

export type TaskListItemElement = {
  type: "task-list-item"
  depth: number
  __firstAtDepth?: boolean // used internally to reset counters
  checked: boolean
  children: Descendant[]
}

/**
 * Any List Item Element
 */

export type ListItemElement =
  | OrderedListItemElement
  | UnorderedListItemElement
  | TaskListItemElement

/**
 * List Plugins Custom Types
 */

export type ListPluginCustomTypes = {
  Name: "list"
  Editor: ListEditor
  Element:
    | OrderedListItemElement
    | UnorderedListItemElement
    | TaskListItemElement
}
