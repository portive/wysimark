import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import {
  TableCellElement,
  TableElement,
  TableRowElement,
} from "../element-types"

function Table({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<TableElement>) {
  return (
    <table {...attributes} style={{ borderCollapse: "collapse" }}>
      <tbody>{children}</tbody>
    </table>
  )
}

function TableRow({
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

function TableCell({
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

export function renderElement({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<
  TableElement | TableRowElement | TableCellElement
>) {
  switch (element.type) {
    case "table":
      return (
        <Table element={element} attributes={attributes}>
          {children}
        </Table>
      )
    case "table-row":
      return (
        <TableRow element={element} attributes={attributes}>
          {children}
        </TableRow>
      )
    case "table-cell":
      return (
        <TableCell element={element} attributes={attributes}>
          {children}
        </TableCell>
      )
  }
}
