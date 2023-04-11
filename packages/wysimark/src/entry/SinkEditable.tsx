import { BaseEditor, BaseText } from "slate"
import { HistoryEditor } from "slate-history"
import { ReactEditor } from "slate-react"
import { AnchorPlugin } from "wysimark/src/anchor-plugin"
import { AtomicDeletePlugin } from "wysimark/src/atomic-delete-plugin"
import { BlockQuotePlugin } from "wysimark/src/block-quote-plugin"
import { CodeBlockPlugin } from "wysimark/src/code-block-plugin"
import { CollapsibleParagraphPlugin } from "wysimark/src/collapsible-paragraph-plugin"
import { ConvertElementPlugin } from "wysimark/src/convert-element-plugin"
import { HeadingPlugin } from "wysimark/src/heading-plugin"
import { HorizontalRulePlugin } from "wysimark/src/horizontal-rule-plugin"
import { ImagePlugin } from "wysimark/src/image-plugin"
import { InlineCodePlugin } from "wysimark/src/inline-code-plugin"
import { ListPlugin } from "wysimark/src/list-plugin"
import { MarksPlugin } from "wysimark/src/marks-plugin"
import { NormalizeAfterDeletePlugin } from "wysimark/src/normalize-after-delete-plugin"
import { createSink, ExtractCustomTypes } from "wysimark/src/sink"
import { TablePlugin } from "wysimark/src/table-plugin"
import { ThemePlugin } from "wysimark/src/theme-plugin"
import { ToolbarPlugin } from "wysimark/src/toolbar-plugin"
import { TrailingBlockPlugin } from "wysimark/src/trailing-block-plugin"
import { UploadAttachmentPlugin } from "wysimark/src/upload-attachment-plugin"
import { UploadPlugin } from "wysimark/src/upload-plugin"

// const plugins = [
//   ConvertElementPlugin,
//   AnchorPlugin,
//   HeadingPlugin,
//   MarksPlugin,
//   InlineCodePlugin,
//   BlockQuotePlugin,
//   CodeBlockPlugin,
//   TablePlugin,
//   HorizontalRulePlugin,
//   TrailingBlockPlugin,
//   ListPlugin,
//   AtomicDeletePlugin,
//   NormalizeAfterDeletePlugin,
//   CollapsibleParagraphPlugin,
//   ThemePlugin,
//   ToolbarPlugin,
// ]

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

type EditorType = PluginTypes["Editor"]
type ElementType = PluginTypes["Element"]
type TextType = PluginTypes["Text"]
export type OptionsType = PluginTypes["Options"]

export type Element = ElementType
export type Text = TextType

/**
 * TODO:
 *
 * One of the big challenges has been whether we can extract the
 * PluginCustomTypes from the `Sink` object.
 *
 * We initially had a problem with extracting `Element` by using
 * `MergePluginCustomTypes` as is currently shown below which we have been able
 * to overcome.
 *
 * The current problem with `createSink` is the incompatible types of
 * `ArraySafePluginCustomTypes` and `BasePluginCustomTypes` and how they are
 * incompatible with each other.
 *
 * The solution may come in the form of being able to use the same type which I
 * think may be possible.
 *
 * The initial problem that was caused was that the plugin CustomTypes are
 * provided and inferred/extracted as an Array or something that feels like a
 * long variable length tuple.
 *
 * This seems similar to the problem we had with `MergPluginCustomTypes` so we
 * may wish to take inspiration from `MergePluginCustomTypes` and particularly
 * with an emphasis on how we wrote the `Element` portion.
 */

const Sink = createSink<PluginTypes>(plugins)
// const Sink = createSink([
//   ConvertElementPlugin,
//   AnchorPlugin,
//   HeadingPlugin,
//   MarksPlugin,
//   InlineCodePlugin,
//   BlockQuotePlugin,
//   CodeBlockPlugin,
//   TablePlugin,
//   HorizontalRulePlugin,
//   TrailingBlockPlugin,
//   ListPlugin,
//   AtomicDeletePlugin,
//   NormalizeAfterDeletePlugin,
//   CollapsibleParagraphPlugin,
//   ThemePlugin,
//   ToolbarPlugin,
//   UploadPlugin,
//   UploadAttachmentPlugin,
//   ImagePlugin,
//   // UploadPlugin({ authToken: process.env.NEXT_PUBLIC_PORTIVE_AUTH_TOKEN }),
//   // UploadAttachmentPlugin,
//   // ImagePlugin({
//   //   imageBlockPresets: [
//   //     /**
//   //      * Pixel Presets
//   //      */
//   //     { name: "S", title: "Small", type: "bounds", width: 160, height: 160 },
//   //     { name: "M", title: "Medium", type: "bounds", width: 320, height: 320 },
//   //     { name: "L", title: "Large", type: "bounds", width: 640, height: 640 },
//   //     /**
//   //      * Scale Presets
//   //      */
//   //     { name: "⅓", title: "1/3 scale", type: "scale", scale: 1 / 3 },
//   //     { name: "½", title: "1/2 scale", type: "scale", scale: 0.5 },
//   //     { name: "Full", title: "Full size", type: "scale", scale: 1 },
//   //   ],
//   //   imageInlinePresets: [
//   //     /**
//   //      * Pixel Presets
//   //      */
//   //     {
//   //       name: "16",
//   //       title: "16 pixels",
//   //       type: "bounds",
//   //       width: 16,
//   //       height: 16,
//   //     },
//   //     {
//   //       name: "24",
//   //       title: "24 pixels",
//   //       type: "bounds",
//   //       width: 24,
//   //       height: 24,
//   //     },
//   //     {
//   //       name: "32",
//   //       title: "32 pixels",
//   //       type: "bounds",
//   //       width: 32,
//   //       height: 32,
//   //     },
//   //     /**
//   //      * Scale Presets
//   //      */
//   //     { name: "⅓", title: "1/3 scale", type: "scale", scale: 1 / 3 },
//   //     { name: "½", title: "1/2 scale", type: "scale", scale: 0.5 },
//   //     { name: "Full", title: "Full size", type: "scale", scale: 1 },
//   //   ],
//   // }),
// ])

const { withSink, SinkEditable } = Sink
export { SinkEditable, withSink }

// export type PluginCustomTypes = MergePluginCustomTypes<
//   [
//     ConvertElementPluginCustomTypes,
//     AnchorPluginCustomTypes,
//     HeadingPluginCustomTypes,
//     MarksPluginCustomTypes,
//     InlineCodePluginCustomTypes,
//     BlockQuotePluginCustomTypes,
//     CodeBlockPluginCustomTypes,
//     TablePluginCustomTypes,
//     HorizontalRulePluginCustomTypes,
//     ListPluginCustomTypes,
//     AtomicDeletePluginCustomTypes,
//     NormalizeAfterDeletePluginCustomTypes,
//     CollapsibleParagraphPluginCustomTypes,
//     ThemePluginCustomTypes,
//     ToolbarPluginCustomTypes,
//     UploadPluginCustomTypes,
//     UploadAttachmentPluginCustomTypes,
//     ImagePluginCustomTypes
//   ]
// >

// export type Element = PluginCustomTypes["Element"]
// export type Text = PluginCustomTypes["Text"]

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor & EditorType
    Element: ElementType
    Text: BaseText & TextType
  }
}
