import {
  ArraySafePluginCustomTypes,
  OExtractCustomTypes,
  PluginFunction,
} from "./plugin-types"

export type ExtractCustomTypes<
  T extends { PluginFunctions: PluginFunction<ArraySafePluginCustomTypes>[] }
> = OExtractCustomTypes<ReturnType<T["PluginFunctions"][number]>>
