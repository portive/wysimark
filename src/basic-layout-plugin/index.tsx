import { clsx } from "clsx"
import { useFocused } from "slate-react"

import { createPlugin, RenderEditable } from "~/src/sink"

import { $Editable } from "./styles"

export type BasicLayoutEditor = {
  basicLayout: true
}

export type BasicLayoutPluginCustomTypes = {
  Name: "basic-layout"
  Editor: BasicLayoutEditor
}

export const BasicLayoutPlugin = () =>
  createPlugin<BasicLayoutPluginCustomTypes>((editor) => {
    editor.basicLayout = true
    return {
      name: "basic-layout",
      renderEditable,
      editor: {},
      editableProps: {},
    }
  })

const renderEditable: RenderEditable = ({ attributes, Editable }) => {
  const focused = useFocused()
  return (
    <Editable
      className={clsx({ "--focused": focused })}
      as={$Editable}
      {...attributes}
    />
  )
}
