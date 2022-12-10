import { Editor, Element, NodeEntry, Path, Point, Range } from "slate"
export * from "./types"

import { createHotkeyHandler, createPlugin, matchElement } from "~/src/sink"

import { createTableMethods } from "./methods"
import { normalizeTableIndexes } from "./normalize/normalize-table"
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
        normalizeNode: (entry): boolean => {
          const [node] = entry
          if (!Element.isElement(node)) return false
          if (node.type === "table") {
            return normalizeTableIndexes(
              editor,
              entry as NodeEntry<TableElement>
            )
          }
          return false
        },
        deleteBackward: () => {
          const t = p.getTableInfo()
          if (!t) return false
          return isStartOfPath(editor, t.cellPath)
        },
        deleteForward: () => {
          const t = p.getTableInfo()
          if (!t) return false
          return isEndOfPath(editor, t.cellPath)
        },
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
          "super+[": p.insertColumnLeft,
          "super+]": p.insertColumnRight,
          "super+c": p.removeColumn,
        }),
      },
    }
  })

/**
 * Private
 *
 * Turns a Point | Range | null into a Point | null for
 */
function normalizeToPoint(at: Point | Range | null): Point | null {
  if (at === null) return null
  if (Point.isPoint(at)) return at
  if (Range.isExpanded(at)) {
    return null
  }
  return at.anchor
}

function isStartOfPath(
  editor: Editor,
  path: Path,
  { at = editor.selection }: { at?: Point | Range | null } = {}
) {
  const point = normalizeToPoint(at)
  return point === null
    ? false
    : Point.equals(point, Editor.start(editor, path))
}

function isEndOfPath(
  editor: Editor,
  path: Path,
  { at = editor.selection }: { at?: Point | Range | null } = {}
) {
  const point = normalizeToPoint(at)
  return point === null ? false : Point.equals(point, Editor.end(editor, path))
}
