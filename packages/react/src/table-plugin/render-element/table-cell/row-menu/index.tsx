import React, { useState } from "react"
import { useSlateStatic } from "slate-react"

import { BarsIcon, MinusIcon, PlusIcon } from "../../../icons"
import { TableCellElement } from "../../../types"
import {
  $AddMenuButton,
  $RemoveMenuButton,
  $RowMenu,
  $RowMenuTile,
} from "../../styles"

export function RowMenu({ cellElement }: { cellElement: TableCellElement }) {
  const editor = useSlateStatic()
  const [hover, setHover] = useState(false)

  return (
    <$RowMenu
      contentEditable={false}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <$RowMenuTile className="--tile">
        <BarsIcon />
      </$RowMenuTile>
      {hover ? (
        <>
          <$RemoveMenuButton
            style={{
              top: "50%",
              left: "0.5em",
              marginTop: "-0.5em",
            }}
            onMouseDown={() =>
              editor.tablePlugin.removeRow({ at: cellElement })
            }
          >
            <MinusIcon />
          </$RemoveMenuButton>
          <$AddMenuButton
            style={{ top: "-0.5em", left: "0.5em" }}
            onMouseDown={() =>
              editor.tablePlugin.insertRow({ at: cellElement })
            }
          >
            <PlusIcon />
          </$AddMenuButton>
          <$AddMenuButton
            style={{ bottom: "-0.5em", left: "0.5em" }}
            onMouseDown={() =>
              editor.tablePlugin.insertRow({ at: cellElement, offset: 1 })
            }
          >
            <PlusIcon />
          </$AddMenuButton>
        </>
      ) : null}
    </$RowMenu>
  )
}
