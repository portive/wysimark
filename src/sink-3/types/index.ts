import { BaseEditor, BaseElement, BaseText } from "slate"

export type BasePluginCustomTypes = {
  Name: string
  Editor: BaseEditor
  Element: BaseElement
  Text: BaseText
}

export type PluginCustomTypes<T extends BasePluginCustomTypes> = T
