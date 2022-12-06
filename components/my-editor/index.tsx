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
  Element: T[number]["Element"] extends BaseElement
    ? T[number]["Element"]
    : undefined
  Text: UnionToIntersection<
    T[number]["Text"] extends BaseText ? T[number]["Text"] : BaseText
  >
}

// ============

export type Tuple = [
  AnchorPluginCustomTypes["Element"],
  HeadingPluginCustomTypes["Element"],
  MarksPluginCustomTypes["Element"],
  InlineCodePluginCustomTypes["Element"]
]

type FilterUndefined<T extends unknown[]> = T extends []
  ? []
  : T extends [infer H, ...infer R]
  ? H extends undefined
    ? FilterUndefined<R>
    : [H, ...FilterUndefined<R>]
  : T

export type C2<T extends Array<BaseElement | unknown>> = Exclude<
  T[number],
  undefined
>

export type T2 = [AnchorElement, HeadingElement, undefined, undefined]
export type T3 = C2<[AnchorElement, HeadingElement, undefined, undefined]>

// ============

export type PluginCustomTypes = MergeCustomTypes<
  [
    AnchorPluginCustomTypes,
    HeadingPluginCustomTypes,
    MarksPluginCustomTypes,
    InlineCodePluginCustomTypes
  ]
>

type ParagraphElement = {
  type: "paragraph"
  children: Descendant[]
}

type CustomEditor = BaseEditor & ReactEditor & AnchorEditor
type CustomText = { text: string } & MarksText & InlineCodeText
type CustomElement = ParagraphElement | AnchorElement | HeadingElement

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
