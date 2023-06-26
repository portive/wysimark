import { clsx } from "clsx"
import { useCallback, useRef, useState } from "react"
import { ReactEditor, useSlateStatic } from "slate-react"

import { CloseMask } from "~/src/shared-overlays"
import { useAbsoluteReposition } from "~/src/use-reposition"

import {
  $TableDialog,
  $TableDialogGrid,
  $TableDialogGridCell,
} from "../../styles/table-styles"

function createRange(size: number): number[] {
  return [...Array(size).keys()]
}

export function TableDialog({
  dest,
  close,
}: {
  dest: HTMLElement
  close: () => void
}) {
  const [hover, setHover] = useState({ x: 0, y: 0 })
  const editor = useSlateStatic()
  const ref = useRef<HTMLDivElement>(null)
  const style = useAbsoluteReposition({ src: ref, dest }, ({ dest }) => {
    return { left: dest.left - 8, top: dest.top + dest.height }
  })
  const rows = createRange(5).map((i) => i + 1)
  const cols = createRange(5).map((i) => i + 1)

  const hoverCell = useCallback(
    (x: number, y: number) => {
      setHover({ x, y })
    },
    [setHover]
  )

  const createTable = useCallback(
    (x: number, y: number) => {
      editor.tablePlugin.insertTable(x, y)
      ReactEditor.focus(editor)
      close()
    },
    [editor]
  )

  return (
    <>
      <CloseMask close={close} />
      <$TableDialog ref={ref} style={style}>
        <$TableDialogGrid onMouseLeave={() => hoverCell(0, 0)}>
          {rows.map((y) => {
            return cols.map((x) => {
              const selected = x <= hover.x && y <= hover.y
              return (
                <$TableDialogGridCell
                  className={clsx({ "--selected": selected })}
                  key={`${x},${y}`}
                  onMouseEnter={() => hoverCell(x, y)}
                  onClick={() => createTable(x, y)}
                />
              )
            })
          })}
        </$TableDialogGrid>
      </$TableDialog>
    </>
  )
}
