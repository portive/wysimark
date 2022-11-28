import { BasePluginCustomTypes, PluginFunction } from "./types"

export const createPlugin = <T extends BasePluginCustomTypes>(
  fn: PluginFunction<T>
) => {
  return fn
}
