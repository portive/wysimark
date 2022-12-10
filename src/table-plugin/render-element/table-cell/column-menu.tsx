import React, { useCallback, useState } from "react"
import { Editor, Element } from "slate"
import { ReactEditor, useSlateStatic } from "slate-react"

import { getTableInfo } from "../../methods/get-table-info"
import { TableCellElement } from "../../types"
// import { $ColumnMenu, $ColumnMenuTile } from "./$row-menu"
import { $AddButton, $RemoveButton } from "./$buttons"
import { $ColumnMenu, $ColumnMenuTile } from "./$column-menu"

function getTableInfoFromElement(editor: Editor, element: Element) {
  const cellPath = ReactEditor.findPath(editor, element)
  return getTableInfo(editor, { at: cellPath })
}

export function ColumnMenu({ cellElement }: { cellElement: TableCellElement }) {
  const editor = useSlateStatic()
  const [hover, setHover] = useState(false)

  // const removeColumnCallback = useCallback(() => {
  //   const t = getTableInfoFromElement(editor, cellElement)
  //   if (!t) return
  //   editor.tablePlugin.removeColumn({ at: t.cellPath })
  // }, [editor, cellElement])

  // const insertColumnAboveCallback = useCallback(() => {
  //   const t = getTableInfoFromElement(editor, cellElement)
  //   if (!t) return
  //   editor.tablePlugin.insertColumnAt(t.rowPath, t.tableColumns.length)
  // }, [editor, cellElement])

  // const insertColumnBelowCallback = useCallback(() => {
  //   const t = getTableInfoFromElement(editor, cellElement)
  //   if (!t) return
  //   editor.tablePlugin.insertColumnAt(
  //     [...t.tablePath, t.rowIndex + 1],
  //     t.tableColumns.length
  //   )
  // }, [editor, cellElement])

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
            // onMouseDown={insertColumnAboveCallback}
          />
          <$AddButton
            style={{ right: "-0.5em", top: 0 }}
            // onMouseDown={insertColumnBelowCallback}
          />
        </>
      ) : null}
    </$ColumnMenu>
  )
}
