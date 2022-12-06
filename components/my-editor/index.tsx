import { useState } from "react"
import { BaseEditor, createEditor, Descendant } from "slate"
import {
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react"

import { AnchorElement, AnchorPlugin } from "~/src/anchor-plugin"
import { HeadingElement, HeadingPlugin } from "~/src/heading-plugin"
import { MarksPlugin, MarksText } from "~/src/marks-plugin"
import {
  BasePluginCustomTypes,
  createSink,
  PluginFunction,
  PluginObject,
} from "~/src/sink"

import { initialValue } from "./initial-value"

// type CreateSinkType<T> = T extends () => PluginFunction<infer I> ? I : never

// type SinkType = CreateSinkType<typeof AnchorPlugin | typeof HeadingPlugin>

// const plugins = createPlugins([AnchorPlugin(), HeadingPlugin()])
const { withSink, SinkEditable } = createSink([
  //
  AnchorPlugin(),
  HeadingPlugin(),
  MarksPlugin(),
])

type ParagraphElement = {
  type: "paragraph"
  children: Descendant[]
}

type CustomText = { text: string } & MarksText
type CustomElement = ParagraphElement | AnchorElement | HeadingElement

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
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

function renderLeaf({ children, leaf, attributes }: RenderLeafProps) {
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
