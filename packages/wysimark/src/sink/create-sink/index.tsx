import { SinkEditable } from "../editable"
import { createWithSink } from "../editor"
import {
  ArraySafePluginCustomTypes,
  BasePluginFn,
  TypedPluginFunction,
} from "../types"

/**
 * A sink is just a function
 */
export const createSink = (pluginFunctions: BasePluginFn[]) => {
  const withSink = createWithSink(pluginFunctions)

  const returnValue = { withSink, SinkEditable }
  return returnValue as {
    PluginFunctions: TypedPluginFunction<ArraySafePluginCustomTypes>
  } & typeof returnValue
}
