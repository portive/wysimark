import "./setup"

import { useState } from "react"
import { BaseEditor, BaseText, createEditor } from "slate"
import { HistoryEditor, withHistory } from "slate-history"
import { ReactEditor, RenderLeafProps, Slate, withReact } from "slate-react"
import {
  AnchorPlugin,
  AnchorPluginCustomTypes,
} from "wysimark/src/anchor-plugin"
import {
  AtomicDeletePlugin,
  AtomicDeletePluginCustomTypes,
} from "wysimark/src/atomic-delete-plugin"
import {
  BlockQuotePlugin,
  BlockQuotePluginCustomTypes,
} from "wysimark/src/block-quote-plugin"
import {
  CodeBlockPlugin,
  CodeBlockPluginCustomTypes,
} from "wysimark/src/code-block-plugin"
import {
  CollapsibleParagraphPlugin,
  CollapsibleParagraphPluginCustomTypes,
} from "wysimark/src/collapsible-paragraph-plugin"
import {
  ConvertElementPlugin,
  ConvertElementPluginCustomTypes,
} from "wysimark/src/convert-element-plugin"
import {
  HeadingPlugin,
  HeadingPluginCustomTypes,
} from "wysimark/src/heading-plugin"
import {
  HorizontalRulePlugin,
  HorizontalRulePluginCustomTypes,
} from "wysimark/src/horizontal-rule-plugin"
import { ImagePlugin } from "wysimark/src/image-plugin"
import { ImagePluginCustomTypes } from "wysimark/src/image-plugin/types"
import {
  InlineCodePlugin,
  InlineCodePluginCustomTypes,
} from "wysimark/src/inline-code-plugin"
import { ListPlugin, ListPluginCustomTypes } from "wysimark/src/list-plugin"
import { MarksPlugin, MarksPluginCustomTypes } from "wysimark/src/marks-plugin"
import {
  NormalizeAfterDeletePlugin,
  NormalizeAfterDeletePluginCustomTypes,
} from "wysimark/src/normalize-after-delete-plugin"
import { createSink, MergePluginCustomTypes } from "wysimark/src/sink"
import { TablePlugin, TablePluginCustomTypes } from "wysimark/src/table-plugin"
import { ThemePlugin, ThemePluginCustomTypes } from "wysimark/src/theme-plugin"
import {
  ToolbarPlugin,
  ToolbarPluginCustomTypes,
} from "wysimark/src/toolbar-plugin"
import { TrailingBlockPlugin } from "wysimark/src/trailing-block-plugin"
import {
  UploadAttachmentPlugin,
  UploadAttachmentPluginCustomTypes,
} from "wysimark/src/upload-attachment-plugin"
import {
  UploadPlugin,
  UploadPluginCustomTypes,
} from "wysimark/src/upload-plugin"

import { initialValue } from "./initial-value"

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
const Sink = createSink([
  ConvertElementPlugin(),
  AnchorPlugin(),
  HeadingPlugin(),
  MarksPlugin(),
  InlineCodePlugin(),
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
  NormalizeAfterDeletePlugin(),
  CollapsibleParagraphPlugin(),
  ThemePlugin(),
  ToolbarPlugin(),
  UploadPlugin({ authToken: process.env.NEXT_PUBLIC_PORTIVE_AUTH_TOKEN }),
  UploadAttachmentPlugin(),
  ImagePlugin({
    imageBlockPresets: [
      /**
       * Pixel Presets
       */
      { name: "S", type: "bounds", width: 160, height: 160 },
      { name: "M", type: "bounds", width: 320, height: 320 },
      { name: "L", type: "bounds", width: 640, height: 640 },
      /**
       * Scale Presets
       */
      { name: "⅓", type: "scale", scale: 1 / 3 },
      { name: "½", type: "scale", scale: 0.5 },
      { name: "Full", type: "scale", scale: 1 },
    ],
    imageInlinePresets: [
      /**
       * Pixel Presets
       */
      { name: "16px", type: "bounds", width: 16, height: 16 },
      { name: "24px", type: "bounds", width: 24, height: 24 },
      { name: "32px", type: "bounds", width: 32, height: 32 },
      /**
       * Scale Presets
       */
      { name: "⅓", type: "scale", scale: 1 / 3 },
      { name: "½", type: "scale", scale: 0.5 },
      { name: "Full", type: "scale", scale: 1 },
    ],
  }),
])

const { withSink, SinkEditable } = Sink

export type PluginCustomTypes = MergePluginCustomTypes<
  [
    ConvertElementPluginCustomTypes,
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
    NormalizeAfterDeletePluginCustomTypes,
    CollapsibleParagraphPluginCustomTypes,
    ThemePluginCustomTypes,
    ToolbarPluginCustomTypes,
    UploadPluginCustomTypes,
    UploadAttachmentPluginCustomTypes,
    ImagePluginCustomTypes
  ]
>

export type Element = PluginCustomTypes["Element"]
export type Text = PluginCustomTypes["Text"]

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor &
      ReactEditor &
      HistoryEditor &
      PluginCustomTypes["Editor"]
    Element: PluginCustomTypes["Element"]
    Text: BaseText & PluginCustomTypes["Text"]
  }
}

function renderLeaf({ children, attributes }: RenderLeafProps) {
  return <span {...attributes}>{children}</span>
}

export const MyEditor = () => {
  /**
   * TODO:
   *
   * We want to get a new instance of the editor if any of the plugins are
   * updated.
   *
   * In order to get this to work, I think we need to create the Sink inside
   * of the Component. Otherwise, React doesn't recognize the changes in the
   * Editor components.
   */

  // function useEditor<T extends BaseEditor>(fn: () => T, deps: unknown[]): T {
  //   const [editor, setEditor] = useState(fn)
  //   useMemo(() => {
  //     setEditor(fn())
  //   }, deps)
  //   return editor
  // }

  const [editor] = useState(() => {
    const editor = createEditor()
    const nextEditor = withSink(withReact(withHistory(editor)))
    nextEditor.convertElement.addConvertElementType("paragraph")
    return nextEditor
  })

  return (
    <div>
      <Slate editor={editor} value={initialValue}>
        <SinkEditable renderLeaf={renderLeaf} />
      </Slate>
      <div className="">
        {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((x, i) => (
          <p key={i}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        ))}
      </div>
    </div>
  )
}
