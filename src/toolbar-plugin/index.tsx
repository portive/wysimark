import { clsx } from "clsx"
import { useFocused } from "slate-react"

import { LayersProvider } from "~/src/layer"
import { createPlugin } from "~/src/sink"

import { Button } from "./button"
import * as Icon from "./icons"
import { Item, items } from "./items"
import { $$Container, $Divider, $Editable, $Toolbar } from "./styles"

export type ToolbarEditor = {
  toolbar: true
}

export type ToolbarPluginCustomTypes = {
  Name: "toolbar"
  Editor: ToolbarEditor
}

function RenderToolbarItem(item: Item, index: number) {
  if (item === "divider") {
    return <$Divider key={index} />
  } else {
    return (
      <Button key={index} title={item.title}>
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
            <LayersProvider>
              <$Toolbar>{items.map(RenderToolbarItem)}</$Toolbar>
            </LayersProvider>
            <Editable as={$Editable} {...attributes} />
          </$$Container>
        )
      },
      editableProps: {},
    }
  })
