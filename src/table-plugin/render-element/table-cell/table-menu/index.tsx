import React, { useState } from "react"
import { useSlateStatic } from "slate-react"

import { TableCellElement } from "../../../types"
import { $AddMenuButton, $RemoveMenuButton } from "../$table-menu-buttons"
import { $TableMenu, $TableMenuTile } from "./$table-menu"

export function TableMenu({ cellElement }: { cellElement: TableCellElement }) {
  const editor = useSlateStatic()
  const [hover, setHover] = useState(false)

  return (
    <$TableMenu
      contentEditable={false}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <$TableMenuTile className="--table-menu-tile" />
    </$TableMenu>
  )
}
