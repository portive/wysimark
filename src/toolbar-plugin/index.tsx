import { clsx } from "clsx"
import { useFocused } from "slate-react"

import { createPlugin } from "~/src/sink"

import { Item, items } from "./config"
import * as Icon from "./icons"
import { $$Container, $Button, $Divider, $Editable, $Toolbar } from "./styles"

export type ToolbarEditor = {
  toolbar: true
}

export type ToolbarPluginCustomTypes = {
  Name: "toolbar"
  Editor: ToolbarEditor
}

function Button({
  active,
  children,
}: {
  active?: boolean
  children: React.ReactNode
}) {
  return <$Button className={clsx({ "--active": active })}>{children}</$Button>
}

function RenderToolbarItem(item: Item, index: number) {
  if (item === "divider") {
    return <$Divider key={index} />
  } else {
    return (
      <Button key={index}>
        <item.icon />
        {item.more ? <Icon.More /> : null}
      </Button>
    )
  }
}

export const ToolbarPlugin = () =>
  createPlugin<ToolbarPluginCustomTypes>((editor) => {
    editor.toolbar = true
    return {
      name: "toolbar",
      editor: {},
      renderEditable: ({ attributes, Editable }) => {
        const focused = useFocused()
        return (
          <$$Container className={clsx({ "--focused": focused })}>
            <$Toolbar>{items.map(RenderToolbarItem)}</$Toolbar>
            <Editable as={$Editable} {...attributes} />
          </$$Container>
        )
      },
      editableProps: {},
    }
  })
