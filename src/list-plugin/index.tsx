import { Editor, Element, Node } from "slate"

import {
  createHotkeyHandler,
  createIsElementType,
  createPlugin,
  transformNodes,
} from "~/src/sink"

import { normalizeNode } from "./normalize-node"
import { renderElement } from "./render-element"
import { ListItemElement, ListPluginCustomTypes } from "./types"

export * from "./types"

export const LIST_ITEM_TYPES: ListItemElement["type"][] = [
  "unordered-list-item",
  "ordered-list-item",
  "task-list-item",
]

export const isListItem = createIsElementType<ListItemElement>(LIST_ITEM_TYPES)

export const ListPlugin = () =>
  createPlugin<ListPluginCustomTypes>((editor) => {
    editor.supportsList = true
    editor.list = {
      indent: () => {
        transformNodes<ListItemElement>(editor, {
          match: isListItem,
          convert: (node) => ({ depth: node.depth + 1 }),
        })
        return true
      },
      outdent: () => {
        /**
         * Don't allow `shift+tab` if any of the list items are already at a
         * depth of `0`
         */
        const entries = Editor.nodes<ListItemElement>(editor, {
          match: isListItem,
        })
        for (const entry of entries) {
          if (entry[0].depth === 0) return true
        }
        transformNodes<ListItemElement>(editor, {
          match: isListItem,
          convert: (node) => ({ depth: Math.max(0, node.depth - 1) }),
        })
        return true
      },
    }
    const hotkeyHandler = createHotkeyHandler({
      tab: editor.list.indent,
      "shift+tab": editor.list.outdent,
    })
    return {
      name: "list",
      editor: {
        normalizeNode: (entry) => normalizeNode(editor, entry),
      },
      editableProps: {
        renderElement,
        onKeyDown(e) {
          if (!Editor.nodes(editor, { match: isListItem })) return false
          return hotkeyHandler(e)
        },
      },
    }
  })
