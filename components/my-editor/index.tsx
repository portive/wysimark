import { useState } from "react"
import { BaseEditor, BaseElement, createEditor, Descendant } from "slate"
import {
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react"
import { Simplify, UnionToIntersection } from "type-fest"

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
import {
  BasePluginCustomTypes,
  createSink,
  ExtractCustomTypes,
  PluginFunction,
  PluginObject,
} from "~/src/sink"
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
    Editor: unknown
    Element: unknown
    Text: unknown
  }>
> = {
  Name: T[number]["Name"]
  Editor: T[number]["Editor"]
  Element: Exclude<T[number]["Element"], BaseElement>
  Text: UnionToIntersection<T[number]["Text"]>
}

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
