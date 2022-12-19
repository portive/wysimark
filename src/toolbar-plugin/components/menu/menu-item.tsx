import { useCallback } from "react"
import { Editor } from "slate"
import { ReactEditor } from "slate-react"

import { $MenuItem } from "../../styles"
import { Item } from "../../types"
import { key } from "./menu"

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
