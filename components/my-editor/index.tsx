import { useState } from "react"
import {
  BaseEditor,
  BaseElement,
  BaseText,
  createEditor,
  Descendant,
} from "slate"
import {
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react"
import { TupleToUnion, UnionToIntersection } from "type-fest"

import {
  AnchorElement,
  AnchorPlugin,
  AnchorPluginCustomTypes,
} from "~/src/anchor-plugin"
import {
  HeadingElement,
  HeadingPlugin,
  HeadingPluginCustomTypes,
} from "~/src/heading-plugin"
import {
  InlineCodePlugin,
  InlineCodePluginCustomTypes,
  InlineCodeText,
} from "~/src/inline-code-plugin"
import {
  MarksPlugin,
  MarksPluginCustomTypes,
  MarksText,
} from "~/src/marks-plugin"
import { createSink } from "~/src/sink"
import { AnchorEditor } from "~/src/sink/sample/anchor-plugin"

import { initialValue } from "./initial-value"

// type CreateSinkType<T> = T extends () => PluginFunction<infer I> ? I : never

// type SinkType = CreateSinkType<typeof AnchorPlugin | typeof HeadingPlugin>

// const plugins = createPlugins([AnchorPlugin(), HeadingPlugin()])
const { withSink, SinkEditable } = createSink([
  //
  AnchorPlugin(),
  HeadingPlugin(),
  InlineCodePlugin(),
  MarksPlugin(),
])

type MergeCustomTypes<
  T extends Array<{
    Name: string
    Editor?: Record<string, unknown>
    Element?: BaseElement
    Text?: BaseText
  }>
> = {
  Name: T[number]["Name"]
  Editor: UnionToIntersection<T[number]["Editor"]>
  Element: TupleToUnion<
    MapPropIfExtends<T, { Element: BaseElement }, "Element">
  >
  Text: UnionToIntersection<
    TupleToUnion<MapPropIfExtends<T, { Text: BaseText }, "Text">>
  >
}

// ============

export type Tuple = [
  AnchorPluginCustomTypes,
  HeadingPluginCustomTypes,
  MarksPluginCustomTypes,
  InlineCodePluginCustomTypes
]

type InputCustomType = {
  Name: string
  Editor?: Record<string, unknown>
  Element?: BaseElement
  Text?: BaseText
}

// /**
//  * This monstrosity taken from
//  * https://stackoverflow.com/questions/54607400/typescript-remove-entries-from-tuple-type
//  *
//  * Using Recursive Conditional Types in TS 4.1
//  * https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#recursive-conditional-types
//  */
// type FilterDefinedElement<T extends InputCustomType[]> = T extends []
//   ? []
//   : T extends [infer H, ...infer R]
//   ? H extends InputCustomType
//     ? R extends InputCustomType[]
//       ? H extends { Element: BaseElement }
//         ? [H["Element"], ...FilterDefinedElement<R>]
//         : FilterDefinedElement<R>
//       : T
//     : never
//   : never

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
  ? [] // confirms to TS that this is an array (weird since it should know)
  : T extends [infer H, ...infer R] // breaks into `H`ead and `R`est
  ? H extends X
    ? // if it extends our X, then grab the prop `H[K]` and recurse
      [H[K], ...MapPropIfExtends<R, X, K>]
    : // if it doesn't extend our X, then skip it and recurse
      MapPropIfExtends<R, X, K>
  : T

export type C2<T extends Array<BaseElement | unknown>> = Exclude<
  T[number],
  undefined
>

export type T2 = [AnchorElement, HeadingElement, undefined, undefined]
export type T3 = C2<[AnchorElement, HeadingElement, undefined, undefined]>
export type T4 = FilterDefinedElement<Tuple>
export type T5 = MapPropIfExtends<Tuple, { Element: BaseElement }, "Element">
export type T6 = MapPropIfExtends<Tuple, { Text: BaseText }, "Text">

// ============

export type PluginCustomTypes = MergeCustomTypes<
  [
    AnchorPluginCustomTypes,
    HeadingPluginCustomTypes,
    MarksPluginCustomTypes,
    InlineCodePluginCustomTypes
  ]
>

type PluginCustomElement = PluginCustomTypes["Element"]
type PluginCustomText = PluginCustomTypes["Text"]

type ParagraphElement = {
  type: "paragraph"
  children: Descendant[]
}

type CustomEditor = BaseEditor & ReactEditor & PluginCustomTypes["Editor"]
type CustomElement = ParagraphElement | AnchorElement | HeadingElement
type CustomText = { text: string } & PluginCustomTypes["Text"]

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}

function renderElement({ children, element, attributes }: RenderElementProps) {
  if (element.type === "paragraph") {
    return <p {...attributes}>{children}</p>
  } else {
    throw new Error(`Unhandled element type ${element.type}`)
  }
}

function renderLeaf({ children, attributes }: RenderLeafProps) {
  return <span {...attributes}>{children}</span>
}

export const MyEditor = () => {
  const [editor] = useState(() => withSink(withReact(createEditor())))
  return (
    <div>
      <Slate editor={editor} value={initialValue}>
        <SinkEditable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          style={{
            border: "1px solid silver",
            padding: "1em",
            margin: "4em",
            font: "16px arial",
          }}
        />
      </Slate>
    </div>
  )
}
