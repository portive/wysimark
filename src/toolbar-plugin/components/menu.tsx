import { useRef } from "react"

import { CloseMask } from "~/src/layer/close-mask"
import { useAbsoluteReposition } from "~/src/use-reposition"

import { $Menu, $MenuDivider, $MenuItem } from "../styles"
import { Item } from "../types"

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
            return <MenuItem key={index} item={item} />
          }
        })}
      </$Menu>
    </>
  )
}

export function MenuItem({ item }: { item: Exclude<Item, "divider"> }) {
  return (
    <>
      <$MenuItem>
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
