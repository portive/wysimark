import { Editor, Node, Path, Transforms } from "slate"
import { useSelected } from "slate-react"
export * from "./types"

import {
  createHotkeyHandler,
  createPlugin,
  matchElement,
  matchEndOfElement,
} from "~/src/sink"

import { MinusIcon, PlusIcon } from "./icons"
import { createTableMethods } from "./methods"
import { TableInfo } from "./methods/get-table-info"
import { renderElement } from "./render-element"
import { TableCellElement, TableElement, TableRowElement } from "./types"

type TableMethods = ReturnType<typeof createTableMethods>

export type TableEditor = {
  supportsTable: true
  tablePlugin: TableMethods
}

export type TablePluginCustomTypes = {
  Name: "table"
  Editor: TableEditor
  Element: TableElement | TableRowElement | TableCellElement
}

export const TablePlugin = () =>
  createPlugin<TablePluginCustomTypes>((editor) => {
    editor.supportsTable = true
    const p = (editor.tablePlugin = createTableMethods(editor))
    return {
      name: "table",
      editor: {
        insertBreak: () => {
          // if we're in a table cell, disable insertBreak
          const entry = matchElement(editor, "table-cell")
          return !!entry
        },
        isInline(element) {
          if (["table", "table-row", "table-cell"].includes(element.type))
            return false
        },
        isVoid(element) {
          if (["table", "table-row", "table-cell"].includes(element.type))
            return false
        },
      },
      editableProps: {
        renderElement,
        onKeyDown: createHotkeyHandler({
          "mod+shift+enter": p.insertRowAbove,
          "mod+enter": p.insertRowBelow,
          "super+r": p.removeRow,
          tab: p.tabForward,
          "shift+tab": p.tabBackward,
          down: p.down,
          up: p.up,
        }),
      },
    }
  })
