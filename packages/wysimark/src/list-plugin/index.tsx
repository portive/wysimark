import { Editor } from "slate"

import {
  createHotkeyHandler,
  createIsElementType,
  createPlugin,
  curryOne,
  TypedPlugin,
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

export const ListPlugin = createPlugin<ListPluginCustomTypes>(
  (editor, options, { createPolicy }) => {
    editor.convertElement.addConvertElementType(LIST_ITEM_TYPES)
    const list = (editor.list = createListMethods(editor))
    const hotkeyHandler = createHotkeyHandler({
      tab: list.indent,
      "shift+tab": list.outdent,
      "super+7": curryOne(list.convertOrderedList, true),
      "super+8": curryOne(list.convertUnorderedList, true),
      "super+9": curryOne(list.convertTaskList, true),
    })

    return createPolicy({
      name: "list",
      editor: {
        normalizeNode: (entry) => normalizeNode(editor, entry),
        insertBreak: list.insertBreak,
      },
      editableProps: {
        renderElement,
        onKeyDown(e) {
          if (!Editor.nodes(editor, { match: isListItem })) return false
          return hotkeyHandler(e)
        },
      },
    })
  }
) as TypedPlugin<ListPluginCustomTypes>
