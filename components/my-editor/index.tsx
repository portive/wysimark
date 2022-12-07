import { useState } from "react"
import { BaseEditor, createEditor, Descendant } from "slate"
import {
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react"

import {
  AnchorElement,
  AnchorPlugin,
  AnchorPluginCustomTypes,
} from "~/src/anchor-plugin"
import {
  BlockQuoteElement,
  BlockQuotePlugin,
  BlockQuotePluginCustomTypes,
} from "~/src/block-quote-plugin"
import {
  HeadingElement,
  HeadingPlugin,
  HeadingPluginCustomTypes,
} from "~/src/heading-plugin"
import {
  InlineCodePlugin,
  InlineCodePluginCustomTypes,
} from "~/src/inline-code-plugin"
import { MarksPlugin, MarksPluginCustomTypes } from "~/src/marks-plugin"
import { createSink, MergePluginCustomTypes } from "~/src/sink"

import { initialValue } from "./initial-value"

const { withSink, SinkEditable } = createSink([
  AnchorPlugin(),
  HeadingPlugin(),
  InlineCodePlugin(),
  MarksPlugin(),
  BlockQuotePlugin(),
])

export type PluginCustomTypes = MergePluginCustomTypes<
  [
    AnchorPluginCustomTypes,
    HeadingPluginCustomTypes,
    MarksPluginCustomTypes,
    InlineCodePluginCustomTypes,
    BlockQuotePluginCustomTypes
  ]
>

type ParagraphElement = {
  type: "paragraph"
  children: Descendant[]
}

type PluginCustomElement = PluginCustomTypes["Element"]

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & PluginCustomTypes["Editor"]
    Element:
      | ParagraphElement
      | AnchorElement
      | HeadingElement
      | BlockQuoteElement
    Text: { text: string } & PluginCustomTypes["Text"]
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
