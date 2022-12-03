import { UnionToIntersection } from "type-fest"

import { ArraySafePluginCustomTypes, PluginCustomTypes } from "."

export type MergePluginCustomTypes<
  T extends PluginCustomTypes<ArraySafePluginCustomTypes>
> = {
  Editor: UnionToIntersection<T["Editor"]>
  Element: T["Element"]
  Text: UnionToIntersection<T["Text"]>
}

export type SinkEditor<
  T extends PluginCustomTypes<ArraySafePluginCustomTypes>
> = MergePluginCustomTypes<T>["Editor"]

export type SinkElement<
  T extends PluginCustomTypes<ArraySafePluginCustomTypes>
> = MergePluginCustomTypes<T>["Element"]

export type SinkText<T extends PluginCustomTypes<ArraySafePluginCustomTypes>> =
  MergePluginCustomTypes<T>["Text"]
