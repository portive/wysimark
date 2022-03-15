import range from "lodash/range"
import React, { useState } from "react"
import { Editor } from "slate"
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ArrowLineUpIcon,
  TrashIcon,
} from "~/editor/icons"
import { useInModal } from "~/lib/modal"
import { stopEvent } from "~/lib/stop-event"
import styled from "@emotion/styled"
import { Table } from "../../table"
import { Item } from "../commands"
import { ToolbarState } from "../utils/get-toolbar-state"
import { ToolbarMenu } from "."

export const TableCommands: Item[] = [
  { divider: true },
  {
    SvgIcon: ArrowLineUpIcon,
    label: "Insert row above",
    hotkey: "mod+shift+enter",
    action({ editor }) {
      Table.insertRow(editor, 0)
    },
  },
  {
    SvgIcon: ArrowLineUpIcon,
    iconProps: { transform: "rotate(180)" },
    label: "Insert row below",
    hotkey: "mod+enter",
    action({ editor }) {
      Table.insertRow(editor, 1)
    },
  },
  { divider: true },
  {
    SvgIcon: ArrowLineUpIcon,
    iconProps: { transform: "rotate(270)" },
    label: "Insert column left",
    // hotkey: "super+[",
    action({ editor }) {
      Table.insertColumn(editor, 0)
    },
  },
  {
    SvgIcon: ArrowLineUpIcon,
    iconProps: { transform: "rotate(90)" },
    label: "Insert column right",
    // hotkey: "super+]",
    action({ editor }) {
      Table.insertColumn(editor, 1)
    },
  },
  { divider: true },
  {
    SvgIcon: AlignLeftIcon,
    label: "Align Column Left",
    action({ editor }) {
      Table.setColumnAlign(editor, "left")
    },
  },
  {
    SvgIcon: AlignCenterIcon,
    label: "Align Column Center",
    action({ editor }) {
      Table.setColumnAlign(editor, "center")
    },
  },
  {
    SvgIcon: AlignRightIcon,
    label: "Align Column Right",
    action({ editor }) {
      Table.setColumnAlign(editor, "right")
    },
  },
  { divider: true },
  {
    SvgIcon: TrashIcon,
    label: "Delete row",
    // hotkey: "mod+.",
    action({ editor }) {
      Table.removeRow(editor)
    },
  },
  {
    SvgIcon: TrashIcon,
    label: "Delete column",
    // hotkey: "mod+shift+.",
    action({ editor }) {
      Table.removeColumn(editor)
    },
  },
  {
    SvgIcon: TrashIcon,
    label: "Delete Table",
    action({ editor }) {
      Table.removeTable(editor)
    },
  },
]

const $Grid = styled.div`
  &.-wysimark-table-grid {
    padding: 0.5em 0.75em;
    .__title {
      font: 400 14px/25px -apple-system, sans-serif;
    }
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 2px;
      td {
        height: 1.5em;
        border: 1px solid #c0c0c0;
        &.selected {
          background: #e9f0ff;
          border: 1px solid #68a0d8;
        }
      }
    }
  }
`

function SelectTableSizeGrid({
  cols,
  rows,
  editor,
}: {
  cols: number
  rows: number
  editor: Editor
}) {
  const modal = useInModal()
  const [pos, setPos] = useState<[number, number] | null>(null)

  function onInsertTable(
    e: React.MouseEvent,
    colCount: number,
    rowCount: number
  ) {
    stopEvent(e)
    Table.insertTable(editor, { rowCount, colCount })
    modal.close()
  }

  return (
    <$Grid className="-wysimark-table-grid">
      <div className="__title">
        {pos == null ? "Insert table" : `${pos[0]}x${pos[1]} table`}
      </div>
      <table onMouseLeave={() => setPos(null)} unselectable="on">
        <tbody>
          {range(1, rows + 1).map((row) => (
            <tr key={row}>
              {range(1, cols + 1).map((col) => {
                const isSelected = pos != null && col <= pos[0] && row <= pos[1]
                return (
                  <td
                    key={col}
                    className={isSelected ? "selected" : undefined}
                    onMouseDown={(e) => onInsertTable(e, col, row)}
                    onMouseEnter={() => setPos([col, row])}
                  />
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </$Grid>
  )
}

export function TableMenu({
  editor,
  dest,
  toolbarState,
}: {
  editor: Editor
  dest: HTMLElement
  toolbarState: ToolbarState
}) {
  return (
    <ToolbarMenu
      editor={editor}
      dest={dest}
      items={TableCommands}
      toolbarState={toolbarState}
    >
      <SelectTableSizeGrid editor={editor} cols={6} rows={3} />
    </ToolbarMenu>
  )
}
