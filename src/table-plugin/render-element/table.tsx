import { styled } from "goober"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { TableElement } from "../types"

const $Table = styled("table")`
  border-collapse: collapse;
`

export function Table({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<TableElement>) {
  return (
    <$Table {...attributes}>
      <tbody>{children}</tbody>
    </$Table>
  )
}
