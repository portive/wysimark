import { Descendant } from "slate"

export type ListEditor = {
  supportsList: true
}

export type ListElement = {
  type: "list"
  style: "ordered" | "unordered" | "task"
  children: ListItemElement[]
}

export type ListItemElement = {
  type: "list-item"
  /**
   * `true` means checked
   * `false` means unchecked
   * `undefined` means a regular list item based on the surrounding `ListElement`
   */
  checked?: boolean
  children: [ListContentElement] | [ListContentElement, ListElement]
}

export type ListContentElement = {
  type: "list-content"
  children: Descendant[] // line
}

export type ListPluginCustomTypes = {
  Name: "list"
  Editor: ListEditor
  Element: ListElement | ListItemElement | ListContentElement
}
