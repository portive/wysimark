import "../../src/setup"

import { useState } from "react"
import { BaseEditor, createEditor } from "slate"
import { withHistory } from "slate-history"
import { ReactEditor, RenderLeafProps, Slate, withReact } from "slate-react"

import {
  AnchorElement,
  AnchorPlugin,
  AnchorPluginCustomTypes,
} from "~/src/anchor-plugin"
import {
  AtomicDeletePlugin,
  AtomicDeletePluginCustomTypes,
} from "~/src/atomic-delete-plugin"
import {
  BasicLayoutPlugin,
  BasicLayoutPluginCustomTypes,
} from "~/src/basic-layout-plugin"
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
  CollapsibleParagraphPlugin,
  ParagraphElement,
} from "~/src/collapsible-paragraph-plugin"
import {
  HeadingElement,
  HeadingPlugin,
  HeadingPluginCustomTypes,
} from "~/src/heading-plugin"
import {
  HorizontalRuleElement,
  HorizontalRulePlugin,
  HorizontalRulePluginCustomTypes,
} from "~/src/horizontal-rule-plugin"
import {
  InlineCodePlugin,
  InlineCodePluginCustomTypes,
} from "~/src/inline-code-plugin"
import {
  ListPlugin,
  ListPluginCustomTypes,
  OrderedListItemElement,
  TaskListItemElement,
  UnorderedListItemElement,
} from "~/src/list-plugin"
import { MarksPlugin, MarksPluginCustomTypes } from "~/src/marks-plugin"
import { createSink, MergePluginCustomTypes } from "~/src/sink"
import {
  TableCellElement,
  TableContentElement,
  TableElement,
  TablePlugin,
  TablePluginCustomTypes,
  TableRowElement,
} from "~/src/table-plugin"
import { ThemePlugin, ThemePluginCustomTypes } from "~/src/theme-plugin"
import { ToolbarPlugin, ToolbarPluginCustomTypes } from "~/src/toolbar-plugin"
import { TrailingBlockPlugin } from "~/src/trailing-block-plugin"

import { initialValue } from "./initial-value"

const { withSink, SinkEditable } = createSink([
  AnchorPlugin(),
  HeadingPlugin(),
  InlineCodePlugin(),
  MarksPlugin(),
  BlockQuotePlugin(),
  CodeBlockPlugin(),
  TablePlugin(),
  HorizontalRulePlugin(),
  TrailingBlockPlugin({
    createTrailingBlock: () => ({
      type: "paragraph",
      children: [{ text: "" }],
    }),
  }),
  ListPlugin(),
  AtomicDeletePlugin(),
  CollapsibleParagraphPlugin(),
  ThemePlugin(),
  // BasicLayoutPlugin(),
  ToolbarPlugin(),
])

export type PluginCustomTypes = MergePluginCustomTypes<
  [
    AnchorPluginCustomTypes,
    HeadingPluginCustomTypes,
    MarksPluginCustomTypes,
    InlineCodePluginCustomTypes,
    BlockQuotePluginCustomTypes,
    CodeBlockPluginCustomTypes,
    TablePluginCustomTypes,
    HorizontalRulePluginCustomTypes,
    ListPluginCustomTypes,
    AtomicDeletePluginCustomTypes,
    ThemePluginCustomTypes,
    // BasicLayoutPluginCustomTypes,
    ToolbarPluginCustomTypes
  ]
>

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & PluginCustomTypes["Editor"]
    Element:
      | AnchorElement
      | HeadingElement
      | BlockQuoteElement
      | CodeBlockElement
      | CodeBlockLineElement
      | HorizontalRuleElement
      | TableElement
      | TableRowElement
      | TableCellElement
      | TableContentElement
      | OrderedListItemElement
      | UnorderedListItemElement
      | TaskListItemElement
      | ParagraphElement
    Text: { text: string } & PluginCustomTypes["Text"]
  }
}

function renderLeaf({ children, attributes }: RenderLeafProps) {
  return <span {...attributes}>{children}</span>
}

export const MyEditor = () => {
  const [editor] = useState(() => {
    const editor = createEditor()
    editor.isConvertible = (element) => element.type === "paragraph"
    return withSink(withReact(withHistory(editor)))
  })

  return (
    <div>
      <Slate editor={editor} value={initialValue}>
        <SinkEditable renderLeaf={renderLeaf} />
      </Slate>
    </div>
  )
}
