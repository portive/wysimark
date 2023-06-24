import React, { useCallback, useRef, useState } from "react"
import { Editor, Transforms } from "slate"
import { useSlateStatic } from "slate-react"

import { BarsIcon, MinusIcon, PlusIcon } from "~/src/table-plugin/icons"
import { useLayer } from "~/src/use-layer"

import { Menu } from "../../../../toolbar-plugin/components/menu/menu"
import { Item } from "../../../../toolbar-plugin/types"
import { getTableInfo } from "../../../methods/get-table-info"
import { TableCellElement } from "../../../types"
import {
  $AddMenuButton,
  $ColumnMenu,
  $ColumnMenuTile,
  $RemoveMenuButton,
} from "../../styled"

function setTableColumnAlign(
  editor: Editor,
  align: "left" | "center" | "right"
) {
  const t = getTableInfo(editor)
  if (t === undefined) return false
  const { tableElement, tablePath, cellIndex } = t
  const nextColumns = tableElement.columns.slice()
  nextColumns.splice(cellIndex, 1, { align })
  Transforms.setNodes(editor, { columns: nextColumns }, { at: tablePath })
  return true
}

export function ColumnMenu({ cellElement }: { cellElement: TableCellElement }) {
  const editor = useSlateStatic()
  const menu = useLayer("column-menu")
  const buttonRef = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState(false)

  const onMouseEnter = useCallback(() => {
    setHover(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setHover(false)
  }, [])

  const onClick = useCallback(() => {
    if (menu.layer) menu.close()
    const dest = buttonRef.current
    if (dest === null) return
    const items: Item[] = [
      {
        icon: BarsIcon,
        title: "Align left",
        action: () => {
          setTableColumnAlign(editor, "left")
        },
      },
      {
        icon: BarsIcon,
        title: "Align Center",
        action: () => {
          setTableColumnAlign(editor, "center")
        },
      },
      {
        icon: BarsIcon,
        title: "Align Right",
        action: () => {
          setTableColumnAlign(editor, "right")
        },
      },
    ]
    // Menu
    menu.open(() => <Menu dest={dest} items={items} close={menu.close} />)
  }, [])

  return (
    <$ColumnMenu
      ref={buttonRef}
      contentEditable={false}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <$ColumnMenuTile className="--tile">
        <BarsIcon />
      </$ColumnMenuTile>
      {hover ? (
        <>
          <$RemoveMenuButton
            style={{
              top: 0,
              left: "50%",
              marginLeft: "-0.5em",
            }}
            onMouseDown={() =>
              editor.tablePlugin.removeColumn({ at: cellElement })
            }
          >
            <MinusIcon />
          </$RemoveMenuButton>

          <$AddMenuButton
            style={{ left: "-0.5em", top: 0 }}
            onMouseDown={() =>
              editor.tablePlugin.insertColumn({ at: cellElement })
            }
          >
            <PlusIcon />
          </$AddMenuButton>
          <$AddMenuButton
            style={{ right: "-0.5em", top: 0 }}
            onMouseDown={() =>
              editor.tablePlugin.insertColumn({ at: cellElement, offset: 1 })
            }
          >
            <PlusIcon />
          </$AddMenuButton>
        </>
      ) : null}
    </$ColumnMenu>
  )
}
