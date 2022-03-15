import { Segment } from "./segment"

/**
 * Ordered List Item Element
 */

export type OrderedListItemElement = {
  type: "ordered-list-item"
  depth: number
  number: number
  children: Segment[]
}

/**
 * Unordered List Item Element
 */

export type UnorderedListItemElement = {
  type: "unordered-list-item"
  depth: number
  children: Segment[]
}

/**
 * Checkable Task List Item Element
 */

export type TaskListItemElement = {
  type: "task-list-item"
  depth: number
  checked: boolean
  children: Segment[]
}

/**
 * Any List Item Element
 */

export type ListItemElement =
  | OrderedListItemElement
  | UnorderedListItemElement
  | TaskListItemElement
