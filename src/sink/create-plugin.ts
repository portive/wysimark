import { BaseEditor, BaseElement, BaseText } from "slate"

import { BasePluginCustomTypes, PluginFunction } from "./types"

/**
 * These are the Input Custom Types for the Plugin which differ from the actual
 * Custom Types for the plugin because, apart from `Name`, most of the
 * keys except for `Name` are optional.
 */
export type InputPluginCustomTypes = {
  Name: string
  /**
   * This describes the additional properties on the Editor, not the full
   * Editor. This is why it does not extend BaseEditor.
   */
  Editor?: Record<string, unknown>
  /**
   * This describes an Element type to be used with this plugin. Note that it
   * can actually be multiple Element types combined with `|`
   */
  Element?: BaseElement
  /**
   * This describes a Text type to be used with this plugin.
   */
  Text?: BaseText
}

type CreatePluginOutputCustomTypes<T extends InputPluginCustomTypes> = {
  Name: T["Name"]
  /**
   * Line doesn't want us to define an empty object because it's usually in
   * error, but I think this is exactly what we want here.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  Editor: T["Editor"] extends Record<string, unknown> ? T["Editor"] : {}
  Element: T["Element"] extends BaseElement ? T["Element"] : BaseElement
  Text: T["Text"] extends BaseText ? T["Text"] : BaseText
}

export const createPlugin = <T extends InputPluginCustomTypes>(
  fn: PluginFunction<CreatePluginOutputCustomTypes<T>>
) => {
  return fn as PluginFunction<CreatePluginOutputCustomTypes<T>>
}
