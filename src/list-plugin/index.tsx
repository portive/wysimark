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
    editor.supportsList = true
    editor.list = createListMethods(editor)
    const hotkeyHandler = createHotkeyHandler({
      tab: editor.list.indent,
      "shift+tab": editor.list.outdent,
      "super+7": editor.list.toggleOrderedList,
      "super+8": editor.list.toggleUnorderedList,
      "super+9": editor.list.toggleTaskList,
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
        // insertBreak: () => {
        //   const entry = matchEndOfElement(editor, isListItem)
        //   if (!entry) return false
        //   insertNodesAndSelectAt(
        //     editor,
        //     {
        //       type: "paragraph",
        //       children: [{ text: "" }],
        //     },
        //     Path.next(entry[1])
        //   )
        //   return true
        // },
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
