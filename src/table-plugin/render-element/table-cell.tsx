import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { TableCellElement } from "../types"

export function TableCell({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<TableCellElement>) {
  const selected = useSelected()
  return (
    <td
      {...attributes}
      style={{
        position: "relative",
        border: "1px solid silver",
        padding: "0 0.5em",
        minWidth: "2em",
        outline: selected ? "2px solid royalblue" : "none",
      }}
    >
      {children}
    </td>
  )
}
