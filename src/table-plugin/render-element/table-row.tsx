import { styled } from "goober"
import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { TableCellElement, TableElement, TableRowElement } from "../types"
import { Table } from "./table"

export function TableRow({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<TableRowElement>) {
  const selected = useSelected()
  return (
    <tr {...attributes} style={{ position: "relative" }}>
      {children}
      <div
        contentEditable={false}
        style={{
          position: "absolute",
          top: -1,
          bottom: -1,
          left: "-1em",
          width: "1em",
          background: "rgba(0,0,0,0.05)",
        }}
      />
    </tr>
  )
}
