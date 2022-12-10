import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { TableRowElement } from "../types"

export function TableRow({
  attributes,
  children,
}: ConstrainedRenderElementProps<TableRowElement>) {
  return (
    <tr {...attributes} style={{ position: "relative" }}>
      {children}
    </tr>
  )
}
