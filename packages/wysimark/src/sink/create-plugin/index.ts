import { InputPluginSchema, TypedPluginFunction } from "../types"
import { BasePlugin } from "../types/plugin/plugin"

/**
 * The `createPlugin` method here takes a function and returns the same
 * function.
 *
 * From a JavaScript point of view, it does nothing itself return itself.
 *
 * From a typing point of view, it takes these two arguments...
 *
 * - The CustomTypes used by the plugin as a Generic
 * - A function that when executed with an `Editor` object, returns a
 *   PluginObject as a function argument
 *
 * ...and ensure that the function argument adheres to the limits of the
 * Generic Argument.
 *
 * For example, if the CustomTypes defines an `Element`, then the function
 * argument will have its element related methods constrained to the Element
 * given in CustomTypes.
 *
 * The benefit of this is that it helps the Plugin only see what is relevant
 * to this plugin. In fact, it insists on it. This will prevent accidental
 * dependency on another plugin.
 *
 * You can add dependencies between plugins, but when we do that, it insists
 * on having that done explicitly.
 */
export const createPlugin = <T extends InputPluginSchema>(
  fn: TypedPluginFunction<T>
) => {
  return { fn } as BasePlugin
}
