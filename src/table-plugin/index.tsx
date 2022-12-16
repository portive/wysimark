import { Element, NodeEntry } from "slate"
export * from "./types"

import {
  createHotkeyHandler,
  createPlugin,
  findElementUp,
  isEndOfElement,
  isStartOfElement,
} from "~/src/sink"

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
          return isStartOfElement(editor, "table-cell")
        },
        deleteForward: () => {
          /**
           * If we're at end of a cell, disable delete forward
           */
          return isEndOfElement(editor, "table-cell")
        },
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
