import { Editor } from "slate"

import { FullSinkEditor } from "../sink/sink-editor"
import {
  InputPluginCustomTypes,
  NormalizeInputPluginCustomTypes,
} from "./plugin-custom-types-for-create"
import { BasePluginPolicy, PluginPolicy } from "./plugin-policy"

/**
 * Shape of a PluginFn (Plugin Function).
 */

export type BasePluginFn = (
  editor: FullSinkEditor,
  options: {},
  helpers: { createPolicy: (value: unknown) => unknown }
) => BasePluginPolicy

export type TypedPluginFunction<T extends InputPluginCustomTypes> = (
  /**
   * We make this T["Editor"] to make sure we get all off the properties
   * for the plugin but also add `Editor` so that Editor will pass the typing
   * for Transform methods and such that take an `Editor` object.
   */
  editor: T["Editor"] & Editor,
  options: {}, // TODO: temporarily it's always empty
  helpers: {
    createPolicy: (
      policy: PluginPolicy<NormalizeInputPluginCustomTypes<T>>
    ) => BasePluginPolicy
  }
) => BasePluginPolicy
