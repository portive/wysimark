import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { TableCellElement } from "../types"

export function TableCell({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<TableCellElement>) {
  const selected = useSelected()
  const isLeftColumn = element.x === 0
  const isTopRow = element.y === 0
  console.log({ isLeftColumn })
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
      {isLeftColumn ? (
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
      {isTopRow ? (
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
