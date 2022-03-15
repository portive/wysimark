import React, { createContext, useContext, useMemo } from "react"
import { useInitialClassName } from "~/lib/use-initial"
import { TableColumn } from "../../types"
import { SeamlessContainer } from "./seamless-container"
import { CustomRenderElementProps } from "./utils"

type ContextProps = {
  columns: TableColumn[]
}

const TableContext = createContext<ContextProps>({} as ContextProps)

/**
 * Render `table` including context
 */

export function Table({
  attributes,
  children,
  element,
}: CustomRenderElementProps<"table">) {
  const initialClassName = useInitialClassName()
  const contextValue = useMemo(() => {
    return { columns: element.columns }
  }, [element.columns])
  return (
    <TableContext.Provider value={contextValue}>
      <SeamlessContainer attributes={attributes} element={element}>
        <table className={initialClassName}>
          <tbody>{children}</tbody>
        </table>
      </SeamlessContainer>
    </TableContext.Provider>
  )
}

/**
 * Render `tr`
 */

export function Tr({ attributes, children }: CustomRenderElementProps<"tr">) {
  return <tr {...attributes}>{children}</tr>
}

/**
 * Render `td`
 */

export function Td(props: CustomRenderElementProps<"td">) {
  const { attributes, children, element } = props
  const { columns } = useContext(TableContext)
  const align = columns[element.index].align
  const style = { textAlign: align }
  return (
    <td {...attributes} style={style}>
      {children}
    </td>
  )
}
