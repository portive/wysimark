import { Element, NodeEntry } from "slate"

import {
  createHotkeyHandler,
  createPlugin,
  findElementUp,
  isEndOfElement,
  isStartOfElement,
} from "~/src/sink"

import { deleteFragment } from "./delete-fragment"
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
        deleteFragment: () => deleteFragment(editor),
        // deleteFragment: () => {
        //   if (editor.selection == null) return false
        //   const [start, end] = Editor.edges(editor, editor.selection)
        //   const startTdEntry = findElementUp<TableCellElement>(
        //     editor,
        //     "table-cell",
        //     { at: start }
        //   )
        //   const endTdEntry = findElementUp<TableCellElement>(
        //     editor,
        //     "table-cell",
        //     { at: end }
        //   )
        //   /**
        //    * If the start or the end of the selection isn't in a table cell,
        //    * then the default handler works fine so return `false`
        //    */
        //   if (!startTdEntry && !endTdEntry) return false
        //   /**
        //    * If the start and end are in the same TD, then the default handler
        //    * works fine so return `false`
        //    */
        //   if (startTdEntry && endTdEntry && startTdEntry[0] === endTdEntry[0])
        //     return false
        //   const positions = [
        //     ...Editor.positions(editor, { at: editor.selection }),
        //   ]

        //   const ranges: Range[] = []

        //   let startPos: BasePoint,
        //     prevPos: BasePoint,
        //     startTdPath: Path | undefined
        //   startPos = prevPos = positions[0]
        //   startTdPath = startTdEntry && startTdEntry[1]
        //   for (const pos of positions) {
        //     const tdEntry = findElementUp<TableCellElement>(
        //       editor,
        //       "table-cell",
        //       { at: pos }
        //     )
        //     const tdPath = tdEntry && tdEntry[1]
        //     if (
        //       (startTdPath && tdPath && Path.equals(startTdPath, tdPath)) ||
        //       (startTdPath == undefined && tdPath == undefined)
        //     ) {
        //       prevPos = pos
        //     } else {
        //       const range = { anchor: startPos, focus: prevPos }
        //       ranges.push(range)
        //       startPos = prevPos = pos
        //       startTdPath = tdPath
        //     }
        //   }
        //   const range = { anchor: startPos, focus: prevPos }
        //   ranges.push(range)
        //   ranges.reverse()

        //   Editor.withoutNormalizing(editor, () => {
        //     for (const range of ranges) {
        //       Transforms.delete(editor, { at: range })
        //     }

        //     Transforms.collapse(editor, { edge: "start" })
        //   })

        //   return true
        // },
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
          "super+t": () => p.insertTable(3, 2),
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
