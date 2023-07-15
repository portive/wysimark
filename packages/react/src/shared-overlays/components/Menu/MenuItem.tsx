import { useCallback } from "react"
import { Editor } from "slate"
import { ReactEditor } from "slate-react"

import { $MenuItem } from "../../../toolbar-plugin/styles"
import { useLayer } from "../../../use-layer"
import { MenuItemData } from "../../types"
import { formatHotkey } from "./formatHotkey"

export function MenuItem({
  editor,
  item,
  close,
  dest,
}: {
  editor: Editor
  item: Exclude<MenuItemData, "divider">
  close: () => void
  dest: HTMLElement
}) {
  const menuLayer = useLayer("menu")

  const onClick = useCallback(() => {
    if (item.Component) {
      const Component = item.Component
      menuLayer.open(() => <Component dest={dest} close={menuLayer.close} />)
    } else if (item.action) {
      item.action(editor)
      ReactEditor.focus(editor)
      close()
    }
  }, [editor, item])
  return (
    <>
      <$MenuItem onClick={onClick}>
        <div className="--icon">
          <item.icon />
        </div>
        <div className="--title">{item.title}</div>
        <div className="--hotkey">
          {item.hotkey ? formatHotkey(item.hotkey) : undefined}
        </div>
      </$MenuItem>
    </>
  )
}
