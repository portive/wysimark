import { styled } from "goober"
import { forwardRef, useContext } from "react"
import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { TableCellElement } from "../../types"
import { TableContext } from "../table-context"
import { ColumnMenu } from "./column-menu"
import { RowMenu } from "./row-menu"

/**
 * TableCell with a `selected` prop to indicate the selection is in the
 * current cell.
 */
const $TableCell = styled("td", forwardRef)`
  position: relative;
  border: 1px solid silver;
  padding: 0 0.5em;
  min-width: 2em;
  outline: ${(props: { selected: boolean }) =>
    props.selected ? "2px solid royalblue" : "none"};
`

export function TableCell({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<TableCellElement>) {
  const tableContext = useContext(TableContext)
  const selected = useSelected()
  /**
   * table has selection and we are in the left columns
   */
  const showRowMenu = tableContext.isSelected && element.x === 0
  /**
   * table has selection and we are in the top row
   */
  const showColumnMenu = tableContext.isSelected && element.y === 0
  return (
    <$TableCell {...attributes} selected={selected}>
      {children}
      {showRowMenu ? <RowMenu cellElement={element} /> : null}
      {showColumnMenu ? <ColumnMenu cellElement={element} /> : null}
    </$TableCell>
  )
}
