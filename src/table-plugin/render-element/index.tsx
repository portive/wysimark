import { ConstrainedRenderElementProps } from "~/src/sink"

import { TableCellElement, TableElement, TableRowElement } from "../types"
import { Table } from "./table"
import { TableCell } from "./table-cell"
import { TableRow } from "./table-row"

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
