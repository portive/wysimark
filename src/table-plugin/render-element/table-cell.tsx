import { useContext } from "react"
import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { TableCellElement } from "../types"
import { TableContext } from "./table-context"

export function TableCell({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<TableCellElement>) {
  const tableContext = useContext(TableContext)
  const selected = useSelected()
  const showLeftColumn = tableContext.isSelected && element.x === 0
  const showTopRow = tableContext.isSelected && element.y === 0
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
      {showLeftColumn ? (
        <div
          contentEditable={false}
          style={{
            position: "absolute",
            background: "rgba(0,0,0,0.05)",
            top: -1,
            bottom: -1,
            width: "1em",
            left: "-1em",
          }}
        />
      ) : null}
      {showTopRow ? (
        <div
          contentEditable={false}
          style={{
            position: "absolute",
            background: "rgba(0,0,0,0.05)",
            top: "-1em",
            height: "1em",
            left: -1,
            right: -1,
          }}
        />
      ) : null}
    </td>
  )
}
