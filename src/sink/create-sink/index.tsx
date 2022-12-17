import { ArraySafePluginCustomTypes, PluginFunction } from "../types"
import { SinkEditable } from "./sink-editable"
import { SinkSlate } from "./sink-slate"
import { createWithSink } from "./with-sink"

/**
 * A sink is just a function
 */
export const createSink = (
  pluginConfigs: PluginFunction<ArraySafePluginCustomTypes>[]
) => {
  const withSink = createWithSink(pluginConfigs)

  const returnValue = { withSink, SinkSlate, SinkEditable }
  return returnValue as {
    PluginFunctions: PluginFunction<ArraySafePluginCustomTypes>
  } & typeof returnValue
}
