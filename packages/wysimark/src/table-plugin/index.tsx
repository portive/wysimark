import { Element, NodeEntry } from "slate"

import {
  createHotkeyHandler,
  createPlugin,
  findElementUp,
  isEndOfElement,
  isStartOfElement,
  TypedPlugin,
} from "~/src/sink"

import { deleteFragmentWithProtectedTypes } from "./delete-fragment"
import { createTableMethods } from "./methods"
import { normalizeTableIndexes } from "./normalize/normalize-table"
import { normalizeTableCell } from "./normalize/normalize-table-cell"
import { renderElement } from "./render-element"
import {
  TableCellElement,
  TableContentElement,
  TableElement,
  TableRowElement,
} from "./types"

export * from "./types"

export type TableEditor = {
  supportsTable: true
  tablePlugin: ReturnType<typeof createTableMethods>
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

export const TablePlugin = createPlugin<TablePluginCustomTypes>(
  (editor, options, { createPolicy }) => {
    editor.supportsTable = true
    editor.tablePlugin = createTableMethods(editor)
    return createPolicy({
      name: "table",
      editor: {
        deleteBackward: () => {
          /**
           * If we're at start of a cell, disable delete backward because we
           * don't want the cell to be deleted.
           */
          return isStartOfElement(editor, "table-cell")
        },
        deleteForward: () => {
          /**
           * If we're at end of a cell, disable delete forward because we don't
           * want the cell to be deleted.
           */
          return isEndOfElement(editor, "table-cell")
        },
        deleteFragment: () =>
          deleteFragmentWithProtectedTypes(editor, ["table-cell"]),
        insertBreak: () => {
          /**
           * IF we're anywhere in a table cell, disable insertBreak
           */
          const entry = findElementUp(editor, "table-cell")
          return !!entry
        },
        isMaster(element) {
          if (element.type === "table") return true
        },
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
              return normalizeTableCell(
                editor,
                entry as NodeEntry<TableCellElement>
              )
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
          tab: editor.tablePlugin.tabForward,
          "shift+tab": editor.tablePlugin.tabBackward,
          down: editor.tablePlugin.down,
          up: editor.tablePlugin.up,
          /**
           * insert
           */
          "super+t": () => editor.tablePlugin.insertTable(3, 2),
          "mod+shift+enter": () => editor.tablePlugin.insertRow({ offset: 0 }),
          "mod+enter": () => editor.tablePlugin.insertRow({ offset: 1 }),
          "super+[": () => editor.tablePlugin.insertColumn({ offset: 0 }),
          "super+]": () => editor.tablePlugin.insertColumn({ offset: 1 }),
          /**
           * remove
           */
          "super+backspace": editor.tablePlugin.removeTable,
          "mod+backspace": editor.tablePlugin.removeRow,
          "mod+shift+backspace": editor.tablePlugin.removeColumn,
        }),
      },
    })
  }
) as TypedPlugin<TablePluginCustomTypes>
