import React from "react"
import { Descendant, Text } from "slate"

import { createPlugin } from "~/src/sink"

import { List } from "./render-element/list"
import { ListItem } from "./render-element/list-item"

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
  children: [ListItemContent] | [ListItemContent, ListElement]
}

export type ListItemContent = {
  type: "list-content"
  children: Descendant[] // line
}

export type ListPluginCustomTypes = {
  Name: "list"
  Editor: ListEditor
  Element: ListElement | ListItemElement | ListItemContent
}

export const ListPlugin = () =>
  createPlugin<ListPluginCustomTypes>((editor) => {
    editor.supportsAnchor = true
    return {
      name: "list",
      editor: {},
      editableProps: {
        renderElement: ({ element, attributes, children }) => {
          if (element.type === "list") {
            return (
              <List element={element} attributes={attributes}>
                {children}
              </List>
            )
          } else if (element.type === "list-item") {
            return (
              <ListItem element={element} attributes={attributes}>
                {children}
              </ListItem>
            )
          } else if (element.type === "list-content") {
            return <span {...attributes}>{children}</span>
          }
        },
      },
    }
  })
