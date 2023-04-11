import { Editor } from "slate"
import { Simplify } from "type-fest"

import { FullSinkEditor } from "../sink/sink-editor"
import { BasePluginPolicy, PluginPolicy } from "./plugin-policy"
import { InputPluginSchema, NormalizeInputPluginSchema } from "./schema-types"

/**
 * Shape of a PluginFn (Plugin Function).
 */

export type BasePluginFn = (
  editor: FullSinkEditor,
  options: {},
  helpers: { createPolicy: (value: unknown) => unknown }
) => BasePluginPolicy

export type TypedPluginFunction<T extends InputPluginSchema> = (
  /**
   * We make this T["Editor"] to make sure we get all off the properties
   * for the plugin but also add `Editor` so that Editor will pass the typing
   * for Transform methods and such that take an `Editor` object.
   */
  editor: T["Editor"] & Editor,
  options: Simplify<NormalizeInputPluginSchema<T>["Options"]>, // TODO: temporarily it's always empty
  helpers: {
    createPolicy: (
      policy: PluginPolicy<NormalizeInputPluginSchema<T>>
    ) => BasePluginPolicy
  }
) => BasePluginPolicy
