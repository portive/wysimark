import React, { useState } from "react"
import { useSlateStatic } from "slate-react"

import { TableCellElement } from "../../../types"
import { $AddButton, $RemoveButton } from "../$table-menu-buttons"
import { $RowMenu, $RowMenuTile } from "./$row-menu"

export function RowMenu({ cellElement }: { cellElement: TableCellElement }) {
  const editor = useSlateStatic()
  const [hover, setHover] = useState(false)

  return (
    <$RowMenu
      contentEditable={false}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <$RowMenuTile className="--row-menu-tile" />
      {hover ? (
        <>
          <$RemoveButton
            style={{
              top: "50%",
              left: 0,
              marginTop: "-0.5em",
            }}
            onMouseDown={() =>
              editor.tablePlugin.removeRow({ at: cellElement })
            }
          />
          <$AddButton
            style={{ top: "-0.5em", left: 0 }}
            onMouseDown={() =>
              editor.tablePlugin.insertRow({ at: cellElement })
            }
          />
          <$AddButton
            style={{ bottom: "-0.5em", left: 0 }}
            onMouseDown={() =>
              editor.tablePlugin.insertRow({ at: cellElement, offset: 1 })
            }
          />
        </>
      ) : null}
    </$RowMenu>
  )
}
