import { BaseElement, BaseText } from "slate"
import { TupleToUnion, UnionToIntersection } from "type-fest"

import { SinkEditor } from "../sink/sink-editor"

/**
 * Takes a Tuple and extracts the property at a given key K if the item in the
 * Tuple extends a given X.
 *
 * e.g.
 * type Mapped = MapPropIfExtends<[{a: 1}, {a: "alpha"}], {a: string}, 'a'>
 *
 * => [{a: 'alpha'}]
 *
 * Inspired from
 * https://stackoverflow.com/questions/54607400/typescript-remove-entries-from-tuple-type
 *
 * Uses Recursive Conditional Types in TS 4.1
 * https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#recursive-conditional-types
 */
type MapPropIfExtends<
  T extends unknown[],
  X extends Record<string, unknown>,
  K extends keyof X
> = T extends []
  ? [] // if it's an empty tuple, return the empty tuple
  : T extends [infer H, ...infer R] // breaks into `H`ead and `R`est
  ? H extends X
    ? // if it extends our X, then grab the prop `H[K]` and recurse
      [H[K], ...MapPropIfExtends<R, X, K>]
    : // if it doesn't extend our X, then skip it and recurse
      MapPropIfExtends<R, X, K>
  : T

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
