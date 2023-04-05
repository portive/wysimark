import { SinkEditable } from "../editable"
import { createWithSink } from "../editor"
import { BasePlugin } from "../types"

/**
 * A sink is just a function
 */
export const createSink = (pluginFunctions: BasePlugin[]) => {
  const fns = pluginFunctions.map((plugin) => plugin.fn)
  const withSink = createWithSink(fns)

  const returnValue = { withSink, SinkEditable }
  return returnValue
}
