import { BaseEditor, BaseText, Descendant } from "slate"
import { HistoryEditor } from "slate-history"
import { ReactEditor } from "slate-react"

import { AnchorPlugin } from "~wysimark/src/anchor-plugin"
import { AtomicDeletePlugin } from "~wysimark/src/atomic-delete-plugin"
import { BlockQuotePlugin } from "~wysimark/src/block-quote-plugin"
import { CodeBlockPlugin } from "~wysimark/src/code-block-plugin"
import { CollapsibleParagraphPlugin } from "~wysimark/src/collapsible-paragraph-plugin"
import { ConvertElementPlugin } from "~wysimark/src/convert-element-plugin"
import { HeadingPlugin } from "~wysimark/src/heading-plugin"
import { HorizontalRulePlugin } from "~wysimark/src/horizontal-rule-plugin"
import { ImagePlugin } from "~wysimark/src/image-plugin"
import { InlineCodePlugin } from "~wysimark/src/inline-code-plugin"
import { ListPlugin } from "~wysimark/src/list-plugin"
import { MarksPlugin } from "~wysimark/src/marks-plugin"
import { NormalizeAfterDeletePlugin } from "~wysimark/src/normalize-after-delete-plugin"
import { createSink, ExtractCustomTypes } from "~wysimark/src/sink"
import { TablePlugin } from "~wysimark/src/table-plugin"
import { ThemePlugin } from "~wysimark/src/theme-plugin"
import { ToolbarPlugin } from "~wysimark/src/toolbar-plugin"
import { TrailingBlockPlugin } from "~wysimark/src/trailing-block-plugin"
import { UploadAttachmentPlugin } from "~wysimark/src/upload-attachment-plugin"
import { UploadPlugin } from "~wysimark/src/upload-plugin"

const plugins = [
  ConvertElementPlugin,
  AnchorPlugin,
  HeadingPlugin,
  MarksPlugin,
  InlineCodePlugin,
  BlockQuotePlugin,
  CodeBlockPlugin,
  TablePlugin,
  HorizontalRulePlugin,
  TrailingBlockPlugin,
  ListPlugin,
  AtomicDeletePlugin,
  NormalizeAfterDeletePlugin,
  CollapsibleParagraphPlugin,
  ThemePlugin,
  ToolbarPlugin,
  UploadPlugin,
  UploadAttachmentPlugin,
  ImagePlugin,
]

type PluginTypes = ExtractCustomTypes<typeof plugins>

type CustomEditor = PluginTypes["Editor"]
type CustomElement = PluginTypes["Element"]
type CustomText = PluginTypes["Text"]

type WysimarkEditor = {
  /**
   * Private state for the wysimark editor.
   */
  wysimark: {
    initialMarkdown: string
    initialValue: Descendant[]
  }
  /**
   * Public methods for the wysimark editor.
   */
  getMarkdown: () => string
  resetMarkdown: (markdown: string) => void
}

export type OptionsType = PluginTypes["Options"]
export type Element = CustomElement
export type Text = CustomText

const Sink = createSink<PluginTypes>(plugins)

const { withSink, SinkEditable } = Sink
export { SinkEditable, withSink }

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor &
      ReactEditor &
      HistoryEditor &
      CustomEditor &
      WysimarkEditor
    Element: CustomElement
    Text: BaseText & CustomText
  }
}
