import { styled } from "goober"
import { forwardRef } from "react"
import { Transforms } from "slate"

import { createHotkeyHandler, createPlugin, matchElement } from "~/src/sink"

import { renderElement } from "./render-element"
import { ListItemElement, ListPluginCustomTypes } from "./types"

export * from "./types"

const LIST_ITEM_TYPES = [
  "unordered-list-item",
  "ordered-list-item",
  "task-list-item",
]

export const ListPlugin = () =>
  createPlugin<ListPluginCustomTypes>((editor) => {
    editor.supportsList = true
    const hotkeyHandler = createHotkeyHandler({
      tab: () => {
        const entry = matchElement<ListItemElement>(editor, LIST_ITEM_TYPES)
        if (!entry) return false
        Transforms.setNodes(
          editor,
          { depth: entry[0].depth + 1 },
          { at: entry[1] }
        )
        return true
      },
      "shift+tab": () => {
        const entry = matchElement<ListItemElement>(editor, LIST_ITEM_TYPES)
        if (!entry) return false
        Transforms.setNodes(
          editor,
          { depth: Math.max(0, entry[0].depth - 1) },
          { at: entry[1] }
        )
        return true
      },
    })
    return {
      name: "list",
      editor: {
        normalizeNode: (entry) => {
          return false
        },
      },
      editableProps: {
        renderElement,
        onKeyDown(e) {
          if (!matchElement(editor, LIST_ITEM_TYPES)) return false
          return hotkeyHandler(e)
        },
      },
    }
  })
