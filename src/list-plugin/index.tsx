import { Editor } from "slate"

import {
  createHotkeyHandler,
  createIsElementType,
  createPlugin,
} from "~/src/sink"

import { createListMethods } from "./methods"
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
    const list = (editor.list = createListMethods(editor))
    const hotkeyHandler = createHotkeyHandler({
      tab: list.indent,
      "shift+tab": list.outdent,
      "super+7": list.toggleOrderedList,
      "super+8": list.toggleUnorderedList,
      "super+9": list.toggleTaskList,
    })
    return {
      name: "list",
      editor: {
        normalizeNode: (entry) => normalizeNode(editor, entry),
        isConvertible: (element) => {
          if (LIST_ITEM_TYPES.includes(element.type)) {
            return true
          }
          return undefined
        },
        insertBreak: list.insertBreak,
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
