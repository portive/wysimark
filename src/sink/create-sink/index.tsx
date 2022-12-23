import { ArraySafePluginCustomTypes, PluginFunction } from "../types"
import { SinkEditable } from "./sink-editable"
import { createWithSink } from "./sink-editor"

/**
 * A sink is just a function
 */
export const createSink = (
  pluginConfigs: PluginFunction<ArraySafePluginCustomTypes>[]
) => {
  const withSink = createWithSink(pluginConfigs)

  const returnValue = { withSink, SinkEditable }
  return returnValue as {
    PluginFunctions: PluginFunction<ArraySafePluginCustomTypes>
  } & typeof returnValue
}
