import { styled } from "goober"
import { forwardRef } from "react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { TableElement } from "../types"

const $Table = styled("table", forwardRef)`
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
