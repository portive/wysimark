import { BaseEditor, BaseElement, BaseText } from "slate"

export type PluginCustomTypes<
  T extends {
    Name: string
    Editor: BaseEditor
    Element: BaseElement
    Text: BaseText
  }
> = T
