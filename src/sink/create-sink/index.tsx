import { SinkEditable } from "../editable"
import { createWithSink } from "../editor"
import { ArraySafePluginCustomTypes, PluginFunction } from "../types"

/**
 * A sink is just a function
 */
export const createSink = (
  pluginFunctions: PluginFunction<ArraySafePluginCustomTypes>[]
) => {
  const withSink = createWithSink(pluginFunctions)

  const returnValue = { withSink, SinkEditable }
  return returnValue as {
    PluginFunctions: PluginFunction<ArraySafePluginCustomTypes>
  } & typeof returnValue
}
