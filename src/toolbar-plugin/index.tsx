import { clsx } from "clsx"
import { useFocused } from "slate-react"

import { createPlugin } from "~/src/sink"

import { Toolbar } from "./components"
import { $Editable, $OuterContainer } from "./styles"

export type ToolbarEditor = {
  toolbar: true
}

export type ToolbarPluginCustomTypes = {
  Name: "toolbar"
  Editor: ToolbarEditor
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
          <$OuterContainer className={clsx({ "--focused": focused })}>
            <Toolbar />
            <Editable as={$Editable} {...attributes} />
          </$OuterContainer>
        )
      },
      editableProps: {},
    }
  })
