import React from "react"
import { NodeEntry } from "slate"

import { createPlugin } from "~/src/sink"

import { normalizeNode } from "./normalize-node"
import { List } from "./render-element/list"
import { ListContent } from "./render-element/list-content"
import { ListItem } from "./render-element/list-item"
import {
  ListContentElement,
  ListElement,
  ListItemElement,
  ListPluginCustomTypes,
} from "./types"

export * from "./types"

export const ListPlugin = () =>
  createPlugin<ListPluginCustomTypes>((editor) => {
    editor.supportsList = true
    return {
      name: "list",
      editor: {
        normalizeNode: (entry) => {
          return normalizeNode(
            editor,
            entry as NodeEntry<
              ListElement | ListItemElement | ListContentElement
            >
          )
        },
      },
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
            return (
              <ListContent element={element} attributes={attributes}>
                {children}
              </ListContent>
            )
          }
        },
      },
    }
  })
