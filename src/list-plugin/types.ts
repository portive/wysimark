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
  /**
   * Technically, it should be
   *
   * [ListContentElement] | [ListContentElement, ListElement]
   *
   * But we loosen it to help us with normalizing because it is often not
   * in the exact shape as above and we can't test for it properly when
   * TypeScript assumes it is always in a good state.
   */

  children: (ListContentElement | ListElement)[]
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
