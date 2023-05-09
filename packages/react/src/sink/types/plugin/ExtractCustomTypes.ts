import { BaseEditor } from "slate"
import { HistoryEditor } from "slate-history"
import { ReactEditor } from "slate-react"
import { Simplify, UnionToIntersection } from "type-fest"

import { SinkEditor } from "../sink/sink-editor"
import { BasePlugin } from "./plugin"

export type ExtractCustomTypes<TA extends Array<BasePlugin>> =
  /**
   * This code takes an array of types and merges them together into a union.
   */
  TA extends Array<{
    __types__: infer U
  }>
    ? {
        // Name: U extends { Name: infer N } ? N : never
        // Options: Simplify<
        //   UnionToIntersection<U extends { Options: infer O } ? O : never>
        // >
        Editor: SinkEditor &
          BaseEditor &
          ReactEditor &
          HistoryEditor &
          UnionToIntersection<U extends { Editor: infer E } ? E : never>
        Element: U extends { Element: infer E } ? E : never
        Text: Simplify<
          UnionToIntersection<U extends { Text: infer T } ? T : never>
        >
        Options: Simplify<
          UnionToIntersection<U extends { Options: infer T } ? T : never>
        >
      }
    : never
