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
      }}
    >
      {children}
      {selected ? (
        <div
          contentEditable={false}
          style={{
            position: "absolute",
            top: -1,
            left: -1,
            bottom: -1,
            right: -1,
            border: "1px solid royalblue",
          }}
        />
      ) : null}
    </td>
  )
}
