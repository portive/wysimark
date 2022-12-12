import "../../src/setup"

import { clsx } from "clsx"
import { styled } from "goober"
import { forwardRef, useState } from "react"
import {
  BaseEditor,
  createEditor,
  Descendant,
  Element,
  Node,
  Range,
} from "slate"
import { withHistory } from "slate-history"
import {
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  useSelected,
  useSlate,
  useSlateStatic,
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
  HorizontalRuleElement,
  HorizontalRulePlugin,
  HorizontalRulePluginCustomTypes,
} from "~/src/horizontal-rule-plugin"
import {
  InlineCodePlugin,
  InlineCodePluginCustomTypes,
} from "~/src/inline-code-plugin"
import { MarksPlugin, MarksPluginCustomTypes } from "~/src/marks-plugin"
import {
  ConstrainedRenderElementProps,
  createSink,
  MergePluginCustomTypes,
} from "~/src/sink"
import {
  TableCellElement,
  TableContentElement,
  TableElement,
  TablePlugin,
  TablePluginCustomTypes,
  TableRowElement,
} from "~/src/table-plugin"
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
    HorizontalRulePluginCustomTypes
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
      | HorizontalRuleElement
      | TableElement
      | TableRowElement
      | TableCellElement
      | TableContentElement
    Text: { text: string } & PluginCustomTypes["Text"]
  }
}

const $Paragraph = styled("p", forwardRef)`
  padding: 0;
  margin: 1em 0;

  transition: background-color 200ms, margin-top 200ms, padding-top 200ms,
    margin-bottom 200ms, padding-bottom 200ms, font-size 200ms;

  &.--collapsed {
    font-size: 0.25em; /* font-size is collapsed to 1/4 of regular em */
    margin: -4em 0; /* margin grows to 3/4 of regular em leaving space */
    padding: 2em 0; /* this is kind of eye-balling it */
    border-radius: 1em;
    &:hover {
      background: rgba(0, 127, 255, 0.1);
      cursor: pointer;
    }
  }
`

function Paragraph({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<ParagraphElement>) {
  const editor = useSlate()
  const selected = useSelected()
  /**
   * One condition of collapsing the paragraph is that the paragraph is empty.
   * We check for empty by checking for one node that contains a text that is
   * empty. If there is an inline element, this will introduce at a minimum
   * 3 nodes based on the way Slate normalizes to always have text nodes at
   * the end which is why this check works.
   */
  const empty =
    element.children.length === 1 &&
    Node.string(element.children[0]).length === 0
  /**
   * We want the paragraph to collapse (because small) when it's empty and
   * the cursor isn't inside of it.
   *
   * Algorithm:
   *
   * If the paragraph is not selected (i.e. the cursor is outside of the
   * paragraph) and the paragraph is empty, we want it to be collapsed.
   *
   * If the selection is in the paragraph, we want the paragraph to not be
   * collapsed; however, there is a situation where the paragraph is empty
   * but the user is selecting a Range which includes the paragraph. In this
   * case, we want it to be small. The quickest check we can make in this
   * situation is to see if the Range is expanded. Normally, we would want to
   * check if the Range is fully inside the paragraph but since an earlier
   * condition is that the paragraph is empty, this check works and executes
   * faster.
   */
  const collapsed =
    empty &&
    (!selected ||
      (selected && editor.selection && Range.isExpanded(editor.selection)))
  return (
    <$Paragraph
      {...attributes}
      className={clsx({ "--collapsed": collapsed })}
      data-collapsed={!!collapsed}
    >
      {children}
    </$Paragraph>
  )
}

function renderElement({ children, element, attributes }: RenderElementProps) {
  if (element.type === "paragraph") {
    return (
      <Paragraph element={element} attributes={attributes}>
        {children}
      </Paragraph>
    )
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
