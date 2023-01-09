import { Editor } from "slate"

import { BasePluginCustomTypes } from "./plugin-custom-types"
import { PluginObject } from "./plugin-object"

export type PluginFunction<T extends BasePluginCustomTypes> = (
  /**
   * We make this T["Editor"] to make sure we get all off the properties
   * for the plugin but also add `Editor` so that Editor will pass the typing
   * for Transform methods and such that take an `Editor` object.
   */
  editor: T["Editor"] & Editor
) => PluginObject<T>
