import {
  Descendant,
  Editor,
  Element,
  NodeEntry,
  Path,
  Text,
  Transforms,
} from "slate"
export * from "./types"

import {
  createHotkeyHandler,
  createPlugin,
  getLines,
  matchElement,
  matchEndOfElement,
  matchStartOfElement,
} from "~/src/sink"

import { createTableMethods } from "./methods"
import { normalizeTableIndexes } from "./normalize/normalize-table"
import { renderElement } from "./render-element"
import {
  TableCellElement,
  TableContentElement,
  TableElement,
  TableRowElement,
} from "./types"

type TableMethods = ReturnType<typeof createTableMethods>

export type TableEditor = {
  supportsTable: true
  tablePlugin: TableMethods
}

export type TablePluginCustomTypes = {
  Name: "table"
  Editor: TableEditor
  Element:
    | TableElement
    | TableRowElement
    | TableCellElement
    | TableContentElement
}

export const TablePlugin = () =>
  createPlugin<TablePluginCustomTypes>((editor) => {
    editor.supportsTable = true
    const p = (editor.tablePlugin = createTableMethods(editor))
    return {
      name: "table",
      editor: {
        deleteBackward: () => {
          /**
           * If we're at start of a cell, disable delete backward
           */
          return !!matchStartOfElement(editor, "table-cell")
        },
        deleteForward: () => {
          /**
           * If we're at end of a cell, disable delete forward
           */
          return !!matchEndOfElement(editor, "table-cell")
        },
        insertBreak: () => {
          /**
           * IF we're anywhere in a table cell, disable insertBreak
           */
          const entry = matchElement(editor, "table-cell")
          return !!entry
        },
        isInline(element) {
          if (
            ["table", "table-row", "table-cell", "table-content"].includes(
              element.type
            )
          )
            return false
        },
        isVoid(element) {
          if (["table", "table-row", "table-cell"].includes(element.type))
            return false
        },
        isInvalidProp() {
          /* noop */
        },
        // isDependant(element) {
        //   if (["table-row", "table-cell"].includes(element.type)) {
        //     return true
        //   } else if (["table"].includes(element.type)) {
        //     return false
        //   }
        // },
        normalizeNode: (entry): boolean => {
          const [node] = entry
          if (!Element.isElement(node)) return false
          switch (node.type) {
            case "table":
              return normalizeTableIndexes(
                editor,
                entry as NodeEntry<TableElement>
              )
            case "table-cell": {
              if (
                node.children.length === 1 &&
                node.children[0].type === "table-content"
              ) {
                return false
              }
              Editor.withoutNormalizing(editor, () => {
                /**
                 * This ensures that the first child node of a `table-cell`
                 * is a `table-content` node. It won't be if a user pastes
                 * in the start of a `table-cell`.
                 *
                 * We want this because our algorithm will merge all following
                 * nodes into this node. If we don't do this, we are merging
                 * into a potentially non `table-content` cell and might end up
                 * with some other `Element` like a `code-block`.
                 *
                 * NOTE:
                 *
                 * In order to make sure this doesn't turn into a noop, we add
                 * some text here. It is arbitrarily an `X`.
                 */
                Transforms.insertNodes(
                  editor,
                  {
                    type: "table-content",
                    children: [{ text: "X" }],
                  },
                  { at: [...entry[1], 0] }
                )
                /**
                 * We then iterate from the back of the children to the front
                 * and merging left. Because we inserted an extra node, the
                 * for loop looks a little unusual in that `i` starts at
                 * `node.children.length` instead of `node.children.length - 1`.
                 */
                for (let i = node.children.length; i >= 0; i--) {
                  Transforms.mergeNodes(editor, { at: [...entry[1], i] })
                }
                /**
                 * When we're done, we remove the `X`.
                 *
                 * There might be a cleaner way to do this whout adding and
                 * removing the `X` and when we find it, we can improve this
                 * code.
                 *
                 * IMPORTANT:
                 *
                 * Whatever a replacement is, remember that we need to execute
                 * the commands such that it preserves the cursor position.
                 */
                Transforms.delete(editor, {
                  at: { path: [...entry[1], 0, 0], offset: 0 },
                  unit: "character",
                })
              })
              return true
            }
          }
          return false
        },
      },
      editableProps: {
        renderElement,
        onKeyDown: createHotkeyHandler({
          /**
           * navigation
           */
          tab: p.tabForward,
          "shift+tab": p.tabBackward,
          down: p.down,
          up: p.up,
          /**
           * insert
           */
          "mod+shift+enter": () => p.insertRow({ offset: 0 }),
          "mod+enter": () => p.insertRow({ offset: 1 }),
          "super+[": () => p.insertColumn({ offset: 0 }),
          "super+]": () => p.insertColumn({ offset: 1 }),
          /**
           * remove
           */
          "super+backspace": p.removeTable,
          "mod+backspace": p.removeRow,
          "mod+shift+backspace": p.removeColumn,
        }),
      },
    }
  })
