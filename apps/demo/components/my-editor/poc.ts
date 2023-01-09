export {}

// import "../../src/setup"

// import { useState } from "react"
// import { BaseEditor, BaseElement, BaseText, createEditor } from "slate"
// import { withHistory } from "slate-history"
// import { ReactEditor, RenderLeafProps, Slate, withReact } from "slate-react"

// import {
//   AnchorElement,
//   AnchorPlugin,
//   AnchorPluginCustomTypes,
// } from "~/src/anchor-plugin"
// import {
//   AtomicDeletePlugin,
//   AtomicDeletePluginCustomTypes,
// } from "~/src/atomic-delete-plugin"
// import {
//   BlockQuoteElement,
//   BlockQuotePlugin,
//   BlockQuotePluginCustomTypes,
// } from "~/src/block-quote-plugin"
// import {
//   CodeBlockElement,
//   CodeBlockLineElement,
//   CodeBlockPlugin,
//   CodeBlockPluginCustomTypes,
// } from "~/src/code-block-plugin"
// import {
//   CollapsibleParagraphPlugin,
//   CollapsibleParagraphPluginCustomTypes,
//   ParagraphElement,
// } from "~/src/collapsible-paragraph-plugin"
// import {
//   ConvertiblePlugin,
//   ConvertiblePluginCustomTypes,
// } from "~/src/convertible-plugin"
// import {
//   HeadingElement,
//   HeadingPlugin,
//   HeadingPluginCustomTypes,
// } from "~/src/heading-plugin"
// import {
//   HorizontalRuleElement,
//   HorizontalRulePlugin,
//   HorizontalRulePluginCustomTypes,
// } from "~/src/horizontal-rule-plugin"
// import { ImagePlugin } from "~/src/image-plugin"
// import {
//   ImageBlockElement,
//   ImageInlineElement,
//   ImagePluginCustomTypes,
// } from "~/src/image-plugin/types"
// import {
//   InlineCodePlugin,
//   InlineCodePluginCustomTypes,
// } from "~/src/inline-code-plugin"
// import {
//   ListPlugin,
//   ListPluginCustomTypes,
//   OrderedListItemElement,
//   TaskListItemElement,
//   UnorderedListItemElement,
// } from "~/src/list-plugin"
// import { MarksPlugin, MarksPluginCustomTypes } from "~/src/marks-plugin"
// import {
//   NormalizeAfterDeletePlugin,
//   NormalizeAfterDeletePluginCustomTypes,
// } from "~/src/normalize-after-delete-plugin"
// import { createSink, SinkEditor } from "~/src/sink"
// import {
//   TableCellElement,
//   TableContentElement,
//   TableElement,
//   TablePlugin,
//   TablePluginCustomTypes,
//   TableRowElement,
// } from "~/src/table-plugin"
// import { ThemePlugin, ThemePluginCustomTypes } from "~/src/theme-plugin"
// import { ToolbarPlugin, ToolbarPluginCustomTypes } from "~/src/toolbar-plugin"
// import { TrailingBlockPlugin } from "~/src/trailing-block-plugin"
// import {
//   UploadAttachmentElement,
//   UploadAttachmentPlugin,
//   UploadAttachmentPluginCustomTypes,
// } from "~/src/upload-attachment-plugin"
// import { UploadPlugin, UploadPluginCustomTypes } from "~/src/upload-plugin"

// import { initialValue } from "./initial-value"
// import { UnionToIntersection, TupleToUnion } from "type-fest"

// const Sink = createSink([
//   ConvertiblePlugin(),
//   AnchorPlugin(),
//   HeadingPlugin(),
//   InlineCodePlugin(),
//   MarksPlugin(),
//   BlockQuotePlugin(),
//   CodeBlockPlugin(),
//   TablePlugin(),
//   HorizontalRulePlugin(),
//   TrailingBlockPlugin({
//     createTrailingBlock: () => ({
//       type: "paragraph",
//       children: [{ text: "" }],
//     }),
//   }),
//   ListPlugin(),
//   AtomicDeletePlugin(),
//   NormalizeAfterDeletePlugin(),
//   CollapsibleParagraphPlugin(),
//   ThemePlugin(),
//   ToolbarPlugin(),
//   UploadPlugin({ authToken: process.env.NEXT_PUBLIC_PORTIVE_AUTH_TOKEN }),
//   UploadAttachmentPlugin(),
//   ImagePlugin(),
// ])

// const { withSink, SinkEditable } = Sink

// /**
//  * Takes a Tuple and extracts the property at a given key K if the item in the
//  * Tuple extends a given X.
//  *
//  * e.g.
//  * type Mapped = MapPropIfExtends<[{a: 1}, {a: "alpha"}], {a: string}, 'a'>
//  *
//  * => [{a: 'alpha'}]
//  *
//  * Inspired from
//  * https://stackoverflow.com/questions/54607400/typescript-remove-entries-from-tuple-type
//  *
//  * Uses Recursive Conditional Types in TS 4.1
//  * https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#recursive-conditional-types
//  */
// type MapPropIfExtends<
//   T extends unknown[],
//   X extends Record<string, unknown>,
//   K extends keyof X
// > = T extends []
//   ? [] // if it's an empty tuple, return the empty tuple
//   : T extends [infer H, ...infer R] // breaks into `H`ead and `R`est
//   ? H extends X
//     ? // if it extends our X, then grab the prop `H[K]` and recurse
//       [H[K], ...MapPropIfExtends<R, X, K>]
//     : // if it doesn't extend our X, then skip it and recurse
//       MapPropIfExtends<R, X, K>
//   : T

// /**
//  * This Generic takes a tuple containing all of the PluginCustomTypes for
//  * ths Sink and returns an object that contains the definitions for
//  * `CustomTypes` for the `Editor`, `Element` and `Text`. These should be
//  * combined with any existing `CustomTypes` on the Editor.
//  *
//  * NOTE:
//  * The `Element` type returned cannot be plugged directly into the CustomTypes
//  * due to a limitation on TypeScript. It complains this is recursive although
//  * it seems to work fine by cutting and pasting the Element value using
//  * TypeScript introspection.
//  */
// export type MergePluginCustomTypes<
//   T extends Array<{
//     Name: string
//     Editor?: Record<string, unknown>
//     Element?: BaseElement
//     Text?: BaseText
//   }>
// > = {
//   Name: T[number]["Name"]
//   Editor: SinkEditor & UnionToIntersection<T[number]["Editor"]>
//   // Element: T[number]["Element"]
//   Element: T[number] extends { Element: BaseElement }
//     ? T[number]["Element"]
//     : {}
//   Text: UnionToIntersection<
//     TupleToUnion<MapPropIfExtends<T, { Text: BaseText }, "Text">>
//   >
// }

// type AllCustomTypes = [
//   ConvertiblePluginCustomTypes,
//   AnchorPluginCustomTypes,
//   HeadingPluginCustomTypes
//   // MarksPluginCustomTypes,
//   // InlineCodePluginCustomTypes,
//   // BlockQuotePluginCustomTypes,
//   // CodeBlockPluginCustomTypes,
//   // TablePluginCustomTypes,
//   // HorizontalRulePluginCustomTypes,
//   // ListPluginCustomTypes,
//   // AtomicDeletePluginCustomTypes,
//   // NormalizeAfterDeletePluginCustomTypes,
//   // CollapsibleParagraphPluginCustomTypes,
//   // ThemePluginCustomTypes,
//   // ToolbarPluginCustomTypes,
//   // UploadPluginCustomTypes,
//   // UploadAttachmentPluginCustomTypes,
//   // ImagePluginCustomTypes
// ]

// type NameCustomTypes = AllCustomTypes[number]["Name"]
// type ElementCustomTypes = AllCustomTypes extends Array<infer Item>
//   ? Item extends { Element: unknown }
//     ? Item["Element"]
//     : never
//   : unknown

// export type PluginCustomTypes = MergePluginCustomTypes<
//   [
//     ConvertiblePluginCustomTypes,
//     AnchorPluginCustomTypes,
//     HeadingPluginCustomTypes
//     // MarksPluginCustomTypes,
//     // InlineCodePluginCustomTypes,
//     // BlockQuotePluginCustomTypes,
//     // CodeBlockPluginCustomTypes,
//     // TablePluginCustomTypes,
//     // HorizontalRulePluginCustomTypes,
//     // ListPluginCustomTypes,
//     // AtomicDeletePluginCustomTypes,
//     // NormalizeAfterDeletePluginCustomTypes,
//     // CollapsibleParagraphPluginCustomTypes,
//     // ThemePluginCustomTypes,
//     // ToolbarPluginCustomTypes,
//     // UploadPluginCustomTypes,
//     // UploadAttachmentPluginCustomTypes,
//     // ImagePluginCustomTypes
//   ]
// >

// export type X = PluginCustomTypes["Element"]

// declare module "slate" {
//   interface CustomTypes {
//     Editor: BaseEditor & ReactEditor & PluginCustomTypes["Editor"]
//     /**
//      * TODO:
//      *
//      * This doesn't work because of a claim of a circular reference. But, I
//      * think I discovered a fix.
//      *
//      * PluginCustomTypes["Element"]
//      *
//      * It appears the issue is in MergePluginCustomTypes because of this code:
//      *
//      * Element: TupleToUnion<MapPropIfExtends<T, { Element: BaseElement },
//      *   "Element">
//      *
//      * The circule reference comes from { Element: BaseElement } which is
//      * replaced when the Element value does not exist. This was used primarily
//      * so that if the `Element` type does not exist for the plugin, then it
//      * defaults to `BaseElement` but `BaseElement` refers to children of type
//      * `Descendant` which itself refers back to `CustomTypes`.
//      *
//      * So a solution that worked when I tried it as a proof of concept was to
//      * instead set `Element: never` and when we `|` it together with other
//      * elements, it will basically just ignore the `CustomTypes["Element"]` for
//      * that particular plugin.
//      *
//      * In this scenario, MergeCustomTypes has a line like this for Element:
//      *
//      * ...
//      *   Element: T[number]["Element"]
//      * ...
//      *
//      * And by default, this handles `never` correctly.
//      *
//      * However, this created some other complications in the code around the
//      * CustomTypes related to plugin creation. I think the ideal scenario is
//      * if we can omit, through some sort of extends statement, when a
//      * property is missing (e.g. `Element`) from our plugin CustomTypes and
//      * have that return `never`.
//      */
//     Element:
//       | AnchorElement
//       | HeadingElement
//       | BlockQuoteElement
//       | CodeBlockElement
//       | CodeBlockLineElement
//       | HorizontalRuleElement
//       | TableElement
//       | TableRowElement
//       | TableCellElement
//       | TableContentElement
//       | OrderedListItemElement
//       | UnorderedListItemElement
//       | TaskListItemElement
//       | ParagraphElement
//       | UploadAttachmentElement
//       | ImageBlockElement
//       | ImageInlineElement
//     Text: BaseText & PluginCustomTypes["Text"]
//   }
// }

// function renderLeaf({ children, attributes }: RenderLeafProps) {
//   return <span {...attributes}>{children}</span>
// }

// export const MyEditor = () => {
//   /**
//    * TODO:
//    *
//    * We want to get a new instance of the editor if any of the plugins are
//    * updated.
//    *
//    * In order to get this to work, I think we need to create the Sink inside
//    * of the Component. Otherwise, React doesn't recognize the changes in the
//    * Editor components.
//    */

//   // function useEditor<T extends BaseEditor>(fn: () => T, deps: unknown[]): T {
//   //   const [editor, setEditor] = useState(fn)
//   //   useMemo(() => {
//   //     setEditor(fn())
//   //   }, deps)
//   //   return editor
//   // }

//   const [editor] = useState(() => {
//     const editor = createEditor()
//     const nextEditor = withSink(withReact(withHistory(editor)))
//     nextEditor.convertible.addConvertibleType("paragraph")
//     return nextEditor
//   })

//   return (
//     <div>
//       <Slate editor={editor} value={initialValue}>
//         <SinkEditable renderLeaf={renderLeaf} />
//       </Slate>
//       <div className="">
//         {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((x, i) => (
//           <p key={i}>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//             ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//             aliquip ex ea commodo consequat. Duis aute irure dolor in
//             reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//             pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//             culpa qui officia deserunt mollit anim id est laborum.
//           </p>
//         ))}
//       </div>
//     </div>
//   )
// }
