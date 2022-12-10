import React, { useCallback, useState } from "react"
import { useSlateStatic } from "slate-react"

import { TableCellElement } from "../../types"
import { $AddButton, $RemoveButton } from "./$buttons"
import { $ColumnMenu, $ColumnMenuTile } from "./$column-menu"

export function ColumnMenu({ cellElement }: { cellElement: TableCellElement }) {
  const editor = useSlateStatic()
  const [hover, setHover] = useState(false)

  return (
    <$ColumnMenu
      contentEditable={false}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <$ColumnMenuTile className="--column-menu-tile" />
      {hover ? (
        <>
          <$RemoveButton
            style={{
              top: 0,
              left: "50%",
              marginLeft: "-0.5em",
            }}
            // onMouseDown={removeColumnCallback}
          />
          <$AddButton
            style={{ left: "-0.5em", top: 0 }}
            onMouseDown={() =>
              editor.tablePlugin.insertColumnLeft({ at: cellElement })
            }
          />
          <$AddButton
            style={{ right: "-0.5em", top: 0 }}
            onMouseDown={() =>
              editor.tablePlugin.insertColumnRight({ at: cellElement })
            }
          />
        </>
      ) : null}
    </$ColumnMenu>
  )
}
