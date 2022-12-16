import { BaseElement, BaseText } from "slate"
import { TupleToUnion, UnionToIntersection } from "type-fest"

import { MapPropIfExtends } from "./map-prop-if-extends"
import { SinkEditor } from "./sink-editor"

/**
 * This Generic takes a tuple containing all of the PluginCustomTypes for
 * ths Sink and returns an object that contains the definitions for
 * `CustomTypes` for the `Editor`, `Element` and `Text`. These should be
 * combined with any existing `CustomTypes` on the Editor.
 *
 * NOTE:
 * The `Element` type returned cannot be plugged directly into the CustomTypes
 * due to a limitation on TypeScript. It complains this is recursive although
 * it seems to work fine by cutting and pasting the Element value using
 * TypeScript introspection.
 */
export type MergePluginCustomTypes<
  T extends Array<{
    Name: string
    Editor?: Record<string, unknown>
    Element?: BaseElement
    Text?: BaseText
  }>
> = {
  Name: T[number]["Name"]
  Editor: SinkEditor & UnionToIntersection<T[number]["Editor"]>
  Element: TupleToUnion<
    MapPropIfExtends<T, { Element: BaseElement }, "Element">
  >
  Text: UnionToIntersection<
    TupleToUnion<MapPropIfExtends<T, { Text: BaseText }, "Text">>
  >
}
