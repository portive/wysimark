import { useRef } from "react"
import { useSlateStatic } from "slate-react"

import { useAbsoluteReposition } from "~/src/use-reposition"

import { $Menu, $MenuDivider } from "../../styles"
import { Item } from "../../types"
import { CloseMask } from "../shared/close-mask"
import { MenuItem } from "./menu-item"

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
  const style = useAbsoluteReposition({ src: ref, dest }, ({ dest }) => {
    return { left: dest.left - 8, top: dest.top + dest.height }
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
