import { Editor, Path, Transforms } from "slate"

import {
  createHotkeyHandler,
  createIsElementType,
  createPlugin,
  curryOne,
  findElementUp,
  isStartOfElement,
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
        deleteBackward: (unit) => {
          /**
           * This handles the logic where if the cursor is at the start of a
           * list item, and the user presses backspace, then the list item
           * should be converted to a paragraph if there are no list items
           * before it. If there is a list item before it, then the normal
           * delete behavior which would merge the list items together will
           * occur.
           */
          if (unit !== "character") return false
          if (!isStartOfElement(editor, isListItem)) return false
          const listItem = findElementUp<ListItemElement>(editor, isListItem)
          if (!listItem) return false
          const listItemPath = listItem[1]
          /**
           * If the current list item is the first element in the document,
           * convert it to a paragraph.
           */
          if (!Path.hasPrevious(listItemPath)) {
            editor.collapsibleParagraph.convertParagraph()
            return true
          }
          const prevElementPath = Path.previous(listItemPath)
          const prevElementEntry = Editor.node(editor, prevElementPath)
          if (isListItem(prevElementEntry[0])) return false
          /**
           * If the previous element is not a list item, then convert the
           * current list item to a paragraph.
           */
          editor.collapsibleParagraph.convertParagraph()
          return true
        },
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
