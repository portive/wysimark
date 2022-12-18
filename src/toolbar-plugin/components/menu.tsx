import { CloseMask } from "~/src/layer/close-mask"

import { $Menu, $MenuItem } from "../styles/styles"
import { Item } from "../types"

function useRect(dest: HTMLElement): DOMRect {
  return dest.getBoundingClientRect()
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
  const rect = useRect(dest)
  return (
    <>
      <CloseMask close={close} />
      <$Menu
        style={{
          left: rect.left,
          top: rect.bottom,
        }}
      >
        {items.map((item, index) => {
          if (item === "divider") {
            return <div key={index}>----</div>
          } else {
            return <MenuItem key={index} item={item} />
          }
        })}
      </$Menu>
    </>
  )
}

const key = {
  cmd: "\u2318",
  ctrl: "\u2303",
  shift: "⇧",
  opt: "⌥",
  enter: "⏎",
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
