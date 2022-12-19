import clsx from "clsx"
import { styled } from "goober"
import { forwardRef, useCallback, useRef, useState } from "react"
import { ReactEditor, useSlateStatic } from "slate-react"

import { useAbsoluteReposition } from "~/src/use-reposition"

import { $Panel } from "../../styles"
import { CloseMask } from "../close-mask"

const $TableDialog = styled($Panel, forwardRef)`
  padding: 0.5em;
`

const $TableDialogGrid = styled("div", forwardRef)`
  display: grid;
  grid-template-columns: repeat(5, 1.75em);
  grid-template-rows: 1.5em;
  /* grid-gap: 1px; */
`

const $TableDialogGridCell = styled("div", forwardRef)`
  background: var(--shade-100);
  height: 1.5em;
  border-radius: 0.125em;
  border-right: 1px solid white;
  border-top: 1px solid white;
  cursor: pointer;
  &.--selected {
    background: var(--blue-100);
  }
`

function createRange(size: number): number[] {
  return [...Array(size).keys()]
}

export function TablePanel({
  dest,
  close,
}: {
  dest: HTMLElement
  close: () => void
}) {
  const [hover, setHover] = useState({ x: 0, y: 0 })
  const editor = useSlateStatic()
  const ref = useRef<HTMLDivElement>(null)
  const style = useAbsoluteReposition({ src: ref, dest }, ({ src, dest }) => {
    return { left: dest.left, top: dest.top + dest.height }
  })
  const rows = createRange(5).map((i) => i + 1)
  const cols = createRange(5).map((i) => i + 1)

  const hoverCell = useCallback(
    (x, y) => {
      setHover({ x, y })
    },
    [setHover]
  )

  const createTable = useCallback(
    (x, y) => {
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
