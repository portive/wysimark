import { SinkEditable } from "../editable"
import { createWithSink } from "../editor"
import { BasePlugin, ExtractedPluginSchema } from "../types"

/**
 * A sink is just a function
 */
export const createSink = <T extends ExtractedPluginSchema>(
  pluginFunctions: BasePlugin[]
) => {
  const fns = pluginFunctions.map((plugin) => plugin.fn)
  const withSink = createWithSink<T>(fns)

  const returnValue = { withSink, SinkEditable }
  return returnValue
}
