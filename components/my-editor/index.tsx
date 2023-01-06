import "../../src/setup"

import { useState } from "react"
import { BaseEditor, BaseText, createEditor } from "slate"
import { HistoryEditor, withHistory } from "slate-history"
import { ReactEditor, RenderLeafProps, Slate, withReact } from "slate-react"

import { AnchorPlugin, AnchorPluginCustomTypes } from "~/src/anchor-plugin"
import {
  AtomicDeletePlugin,
  AtomicDeletePluginCustomTypes,
} from "~/src/atomic-delete-plugin"
import {
  BlockQuotePlugin,
  BlockQuotePluginCustomTypes,
} from "~/src/block-quote-plugin"
import {
  CodeBlockPlugin,
  CodeBlockPluginCustomTypes,
} from "~/src/code-block-plugin"
import {
  CollapsibleParagraphPlugin,
  CollapsibleParagraphPluginCustomTypes,
} from "~/src/collapsible-paragraph-plugin"
import { HeadingPlugin, HeadingPluginCustomTypes } from "~/src/heading-plugin"
import {
  HorizontalRulePlugin,
  HorizontalRulePluginCustomTypes,
} from "~/src/horizontal-rule-plugin"
import { ImagePlugin } from "~/src/image-plugin"
import { ImagePluginCustomTypes } from "~/src/image-plugin/types"
import {
  InlineCodePlugin,
  InlineCodePluginCustomTypes,
} from "~/src/inline-code-plugin"
import { ListPlugin, ListPluginCustomTypes } from "~/src/list-plugin"
import { MarksPlugin, MarksPluginCustomTypes } from "~/src/marks-plugin"
import {
  NormalizeAfterDeletePlugin,
  NormalizeAfterDeletePluginCustomTypes,
} from "~/src/normalize-after-delete-plugin"
import { createSink, MergePluginCustomTypes } from "~/src/sink"
import { TablePlugin, TablePluginCustomTypes } from "~/src/table-plugin"
import { ThemePlugin, ThemePluginCustomTypes } from "~/src/theme-plugin"
import {
  ToggleElementPlugin,
  ToggleElementPluginCustomTypes,
} from "~/src/toggle-element-plugin"
import { ToolbarPlugin, ToolbarPluginCustomTypes } from "~/src/toolbar-plugin"
import { TrailingBlockPlugin } from "~/src/trailing-block-plugin"
import {
  UploadAttachmentPlugin,
  UploadAttachmentPluginCustomTypes,
} from "~/src/upload-attachment-plugin"
import { UploadPlugin, UploadPluginCustomTypes } from "~/src/upload-plugin"

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
  ToggleElementPlugin(),
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
  ImagePlugin(),
])

const { withSink, SinkEditable } = Sink

export type PluginCustomTypes = MergePluginCustomTypes<
  [
    ToggleElementPluginCustomTypes,
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
    nextEditor.toggleElement.addToggleElementType("paragraph")
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
