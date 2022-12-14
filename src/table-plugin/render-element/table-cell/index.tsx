import { useContext } from "react"
import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { TableCellElement } from "../../types"
import { $TableCell } from "../styled"
import { TableContext } from "../table-context"
import { ColumnMenu } from "./column-menu"
import { RowMenu } from "./row-menu"
import { TableMenu } from "./table-menu"

export function TableCell({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<TableCellElement>) {
  const tableContext = useContext(TableContext)
  const selected = useSelected()
  /**
   * table has slection and we are in the top left cell
   */
  const showTableMenu =
    tableContext.isSelected && element.x === 0 && element.y === 0
  /**
   * table has selection and we are in the left columns
   */
  const showRowMenu = tableContext.isSelected && element.x === 0
  /**
   * table has selection and we are in the top row
   */
  const showColumnMenu = tableContext.isSelected && element.y === 0
  return (
    <$TableCell className={selected ? "--selected" : ""} {...attributes}>
      {children}
      {showTableMenu ? <TableMenu cellElement={element} /> : null}
      {showRowMenu ? <RowMenu cellElement={element} /> : null}
      {showColumnMenu ? <ColumnMenu cellElement={element} /> : null}
    </$TableCell>
  )
}
