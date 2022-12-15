import { Editor, Element, Node } from "slate"

import { createHotkeyHandler, createPlugin, transformNodes } from "~/src/sink"

import { renderElement } from "./render-element"
import { ListItemElement, ListPluginCustomTypes } from "./types"

export * from "./types"

const LIST_ITEM_TYPES = [
  "unordered-list-item",
  "ordered-list-item",
  "task-list-item",
]

function isListItem(node: Node): node is Element {
  return Element.isElement(node) && LIST_ITEM_TYPES.includes(node.type)
}

export const ListPlugin = () =>
  createPlugin<ListPluginCustomTypes>((editor) => {
    editor.supportsList = true
    const hotkeyHandler = createHotkeyHandler({
      tab: () => {
        transformNodes<ListItemElement>(editor, {
          match: isListItem,
          convert: (node) => ({ depth: node.depth + 1 }),
        })
        return true
      },
      "shift+tab": () => {
        transformNodes<ListItemElement>(editor, {
          match: isListItem,
          convert: (node) => ({ depth: Math.max(0, node.depth - 1) }),
        })
        return true
      },
    })
    return {
      name: "list",
      editor: {
        normalizeNode: () => {
          return false
        },
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
