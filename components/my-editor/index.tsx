import "../../src/setup"

import { useState } from "react"
import { BaseEditor, createEditor, Descendant } from "slate"
import { withHistory } from "slate-history"
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
  CodeBlockElement,
  CodeBlockLineElement,
  CodeBlockPlugin,
  CodeBlockPluginCustomTypes,
} from "~/src/code-block-plugin"
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
import {
  TableCellElement,
  TableElement,
  TablePlugin,
  TablePluginCustomTypes,
  TableRowElement,
} from "~/src/table-plugin"

import { initialValue } from "./initial-value"

const { withSink, SinkEditable } = createSink([
  AnchorPlugin(),
  HeadingPlugin(),
  InlineCodePlugin(),
  MarksPlugin(),
  BlockQuotePlugin(),
  CodeBlockPlugin(),
  TablePlugin(),
])

export type PluginCustomTypes = MergePluginCustomTypes<
  [
    AnchorPluginCustomTypes,
    HeadingPluginCustomTypes,
    MarksPluginCustomTypes,
    InlineCodePluginCustomTypes,
    BlockQuotePluginCustomTypes,
    CodeBlockPluginCustomTypes,
    TablePluginCustomTypes
  ]
>

type ParagraphElement = {
  type: "paragraph"
  children: Descendant[]
}

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & PluginCustomTypes["Editor"]
    Element:
      | ParagraphElement
      | AnchorElement
      | HeadingElement
      | BlockQuoteElement
      | CodeBlockElement
      | CodeBlockLineElement
      | TableElement
      | TableRowElement
      | TableCellElement
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
  const [editor] = useState(() =>
    withSink(withReact(withHistory(createEditor())))
  )
  return (
    <div>
      <Slate editor={editor} value={initialValue}>
        <SinkEditable renderElement={renderElement} renderLeaf={renderLeaf} />
      </Slate>
    </div>
  )
}
