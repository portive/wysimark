import { BaseElement, BaseText } from "slate"
import { UnionToIntersection } from "type-fest"

import { SinkEditor } from "../sink/sink-editor"

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
  /**
   * The first part with the `infer` is so that we can extract
   * `PluginCustomType` cleanly. If we don't extract `Element` first and we try
   * and operate on the object, can't seem to get the typing to work. Note that
   * the conditional is only there so that we can `infer` the
   * `PluginCustomType`.
   *
   * The second part checks to see if there is an `Element` property and if
   * there is, we extract that. TypeScript will turn all of these extracted
   * `Element` types into a union (i.e. they will be "|" together).
   *
   * If the property doesn't exist, it will be treated as `never`. In TypeScript
   * when we `|` a type with a `never` type, the `never` just gets ignored.
   */
  Element: T extends Array<infer PluginCustomType>
    ? PluginCustomType extends { Element: unknown }
      ? PluginCustomType["Element"]
      : never
    : /**
       * This actually should never happen because the incoming T is already
       * typed to extend Array.
       */
      never

  /**
   * Same as above to create the `Union` but then at the very end we turn it
   * into an intersection using the `type-fest` generic `UnionToIntersection`
   */
  Text: UnionToIntersection<
    T extends Array<infer PluginCustomType>
      ? PluginCustomType extends { Text: unknown }
        ? PluginCustomType["Text"]
        : never
      : /**
         * This actually should never happen because the incoming T is already
         * typed to extend Array.
         */
        never
  >
}
