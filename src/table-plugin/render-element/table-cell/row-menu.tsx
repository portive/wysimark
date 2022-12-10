import React, { useCallback, useState } from "react"
import { Editor, Element } from "slate"
import { ReactEditor, useSlateStatic } from "slate-react"

import { getTableInfo } from "../../methods/get-table-info"
import { TableCellElement } from "../../types"
import { $RowMenu, $RowMenuTile } from "./$row-menu"
import { $AddButton, $RemoveButton } from "./$buttons"

function getTableInfoFromElement(editor: Editor, element: Element) {
  const cellPath = ReactEditor.findPath(editor, element)
  return getTableInfo(editor, { at: cellPath })
}

export function RowMenu({ cellElement }: { cellElement: TableCellElement }) {
  const editor = useSlateStatic()
  const [hover, setHover] = useState(false)

  const removeRowCallback = useCallback(() => {
    const t = getTableInfoFromElement(editor, cellElement)
    if (!t) return
    editor.tablePlugin.removeRow({ at: t.cellPath })
  }, [editor, cellElement])

  const insertRowAboveCallback = useCallback(() => {
    const t = getTableInfoFromElement(editor, cellElement)
    if (!t) return
    editor.tablePlugin.insertRowAt(t.rowPath, t.tableColumns.length)
  }, [editor, cellElement])

  const insertRowBelowCallback = useCallback(() => {
    const t = getTableInfoFromElement(editor, cellElement)
    if (!t) return
    editor.tablePlugin.insertRowAt(
      [...t.tablePath, t.rowIndex + 1],
      t.tableColumns.length
    )
  }, [editor, cellElement])

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
            onMouseDown={removeRowCallback}
          />
          <$AddButton
            style={{ top: "-0.5em", left: 0 }}
            onMouseDown={insertRowAboveCallback}
          />
          <$AddButton
            style={{ bottom: "-0.5em", left: 0 }}
            onMouseDown={insertRowBelowCallback}
          />
        </>
      ) : null}
    </$RowMenu>
  )
}
