import React from "react"
import { Editor } from "slate"
import { ReactEditor } from "slate-react"
import { useInModal } from "~/lib/modal"
import { Menu } from "~/lib/modals/menu"
import { reselect } from "../../custom"
import { Item, isCommand } from "../commands"
import { ToolbarState } from "../utils/get-toolbar-state"

export function ToolbarMenu({
  children, // use this to pass in a header at top of Menu
  items,
  dest,
  editor,
  toolbarState,
}: {
  children?: React.ReactNode
  items: Item[]
  dest: HTMLElement
  editor: Editor
  toolbarState: ToolbarState
}) {
  const modal = useInModal()
  return (
    <Menu dest={dest}>
      {children}
      {items.map((item, index) => {
        if (isCommand(item)) {
          // const { faIcon, label, hotkey, action } = item
          const active = item.isActive ? item.isActive(toolbarState) : false
          const action = item.action
          const onMouseDown = () => {
            /**
             * close modal first as call to `action` might open a new modal.
             * We don't want to close the one that's supposed to be opened.
             */
            modal.close()
            reselect(editor)
            action({ editor, dest, modal, toolbarState })
            setTimeout(() => {
              ReactEditor.focus(editor)
            }, 0)
          }
          return (
            <Menu.Item
              key={item.label}
              SvgIcon={item.SvgIcon}
              iconProps={item.iconProps}
              hotkey={item.hotkey}
              onMouseDown={onMouseDown}
              active={active}
            >
              {item.label}
            </Menu.Item>
          )
        } else {
          return <Menu.Divider key={index} />
        }
      })}
    </Menu>
  )
}
