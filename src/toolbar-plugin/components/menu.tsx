import { useCallback, useRef } from "react"
import { Editor } from "slate"
import { ReactEditor, useSlateStatic } from "slate-react"

import { useAbsoluteReposition } from "~/src/use-reposition"

import { $Menu, $MenuDivider, $MenuItem } from "../styles"
import { Item } from "../types"
import { CloseMask } from "./close-mask"

const key = {
  cmd: "\u2318",
  ctrl: "\u2303",
  shift: "⇧",
  opt: "⌥",
  enter: "⏎",
}

export function Menu({
  dest,
  items,
  close,
}: {
  dest: HTMLElement
  close: () => void
  items: Item[]
}) {
  const editor = useSlateStatic()
  const ref = useRef<HTMLDivElement>(null)
  const style = useAbsoluteReposition({ src: ref, dest }, ({ src, dest }) => {
    return { left: dest.left, top: dest.top + dest.height }
  })

  return (
    <>
      <CloseMask close={close} />
      <$Menu ref={ref} style={style}>
        {items.map((item, index) => {
          if (item === "divider") {
            return <$MenuDivider key={index} />
          } else {
            return (
              <MenuItem key={index} editor={editor} item={item} close={close} />
            )
          }
        })}
      </$Menu>
    </>
  )
}

export function MenuItem({
  editor,
  item,
  close,
}: {
  editor: Editor
  item: Exclude<Item, "divider">
  close: () => void
}) {
  const onClick = useCallback(() => {
    if (!item.action) return
    item.action(editor)
    ReactEditor.focus(editor)
    close()
  }, [editor, item])
  return (
    <>
      <$MenuItem onClick={onClick}>
        <div className="--icon">
          <item.icon />
        </div>
        <div className="--title">{item.title}</div>
        <div className="--hotkey">
          {key.opt}
          {key.cmd}1
        </div>
      </$MenuItem>
    </>
  )
}
