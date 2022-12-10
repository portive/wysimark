import { styled } from "goober"
import { forwardRef } from "react"
import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { TableElement } from "../types"
import { TableContext } from "./table-context"

const $Table = styled("table", forwardRef)`
  border-collapse: collapse;
`

export function Table({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<TableElement>) {
  const isSelected = useSelected()
  return (
    <TableContext.Provider value={{ isSelected }}>
      <$Table {...attributes}>
        <tbody>{children}</tbody>
      </$Table>
    </TableContext.Provider>
  )
}
