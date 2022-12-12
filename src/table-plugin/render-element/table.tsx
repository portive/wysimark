import { styled } from "goober"
import { forwardRef, useEffect } from "react"
import { ReactEditor, useSelected, useSlateStatic } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { normalizeTableIndexes } from "../normalize/normalize-table"
import { TableElement } from "../types"
import { TableContext } from "./table-context"

const $Table = styled("table", forwardRef)`
  border-collapse: collapse;
  margin: 1em 0;
`

export function Table({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<TableElement>) {
  const editor = useSlateStatic()
  const isSelected = useSelected()
  /**
   * The first time we render a table, we make sure it is normalized.
   * When it comes out of an `initialValue` it's not guaranteed to include
   * `x` and `y` properties as they are optional.
   *
   * This mainly helps us not have to manually add these values when the
   * `x` and `y` are purely an internal requirement for rendering.
   */
  useEffect(() => {
    const path = ReactEditor.findPath(editor, element)
    normalizeTableIndexes(editor, [element, path])
  }, [])
  return (
    <TableContext.Provider value={{ isSelected }}>
      <$Table {...attributes}>
        <tbody>{children}</tbody>
      </$Table>
    </TableContext.Provider>
  )
}
