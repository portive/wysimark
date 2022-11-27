import {
  BaseEditor,
  BaseElement,
  BaseText,
  createEditor,
  Node,
  NodeEntry,
} from "slate"
import { HistoryEditor, withHistory } from "slate-history"
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  Slate,
  withReact,
} from "slate-react"
import { Simplify } from "type-fest"

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

let renderElement: any

let useSlateSink: any
let createSink: any

// other types

/**
 * The ARGS represents the arguments that will be passed into the function.
 * T always represents the return value.
 */
type Resolvable<T, ARGS extends unknown[] = []> = T
type ResolvablePromise<T, ARGS extends unknown[] = []> = Promise<T>

type SlateProps = Parameters<typeof Slate>[0]
type EditableProps = Parameters<typeof Editable>[0]

// types for Sink
type BaseSinkEditor = BaseEditor
type SinkEditor<T> = any
type SinkElement<T> = any
type SinkText<T> = any
type SinkConfig = any

/**
 * This is a temporary type used by AugmentEditor. It lists the property typing
 * we want in the editor that we want to override (i.e. replace) from the
 * BaseEditor using more narrowly defined types.
 */
type OverridedEditorProps<$Element extends BaseElement> = {
  children: $Element[]
  isInline: (element: $Element) => boolean
  isVoid: (element: $Element) => boolean
  markableVoid: (element: $Element) => boolean
  normalizeNode: (entry: NodeEntry<$Element>) => void
  getFragment: () => $Element[]
  insertFragment: (fragment: $Element[]) => void
  insertNode: (node: $Element) => boolean
}

/**
 * Augments an existing Editor object with an Element. Mainly, this allows
 * us to add element types to certain mthods like `isInline`.
 */
type AugmentEditor<
  $Editor extends BaseEditor,
  $Element extends BaseElement
> = Omit<BaseElement, keyof OverridedEditorProps<$Element> & OverridedEditorProps<$Element>

// children: Descendant[];
// selection: Selection;
// operations: Operation[];
// marks: EditorMarks | null;
// isInline: (element: Element) => boolean;
// isVoid: (element: Element) => boolean;
// markableVoid: (element: Element) => boolean;
// normalizeNode: (entry: NodeEntry) => void;
// onChange: () => void;
// addMark: (key: string, value: any) => void;
// apply: (operation: Operation) => void;
// deleteBackward: (unit: TextUnit) => void;
// deleteForward: (unit: TextUnit) => void;
// deleteFragment: (direction?: TextDirection) => void;
// getFragment: () => Descendant[];
// insertBreak: () => void;
// insertSoftBreak: () => void;
// insertFragment: (fragment: Node[]) => void;
// insertNode: (node: Node) => void;
// insertText: (text: string) => void;
// removeMark: (key: string) => void;
// getDirtyPaths: (op: Operation) => Path[];

// type PluginValue<V extends {element: BaseElement}> =
// type MyValue = PluginValue<{ element: AnchorElement }>

/**
 * A SinkPlugin takes an editor in and spits an editor out.
 *
 * It also takes a set of CustomTypes that are used to:
 *
 * a. Add some type safety to properties on the editor like `isInline`
 * b. Add some type safety to `editableProps` like `renderElement`
 * c. Spit out some `CustomTypes` that should be added to editor Custom Types
 */
// type SinkPlugin<InEditor extends BaseEditor, OutEditor extends BaseEditor> = {
//   type: "link"
//   editor: (editor: OutEditor) => Partial<OutEditor>
//   slateProps: (editor: InEditor, props: SlateProps) => SlateProps
//   editableProps: (editor: InEditor, props: EditableProps) => EditableProps
// }

type RetypedEditorProps<T extends SinkPluginBaseTypes> = {
  isInline: (element: T["Element"]) => boolean
  isVoid: (element: T["Element"]) => boolean
  markableVoid: (element: T["Element"]) => boolean
  insertNode: (node: T["Editor"] | T["Element"] | T["Text"]) => void
}

type DefineTypedEditor<T extends SinkPluginBaseTypes> = RetypedEditorProps<T> &
  Omit<T["Editor"], keyof RetypedEditorProps<T>>

// type DefineTypedEditor<T extends SinkPluginBaseTypes> = {
//   [K in keyof T]: K extends keyof RetypedEditorProps<T>
//     ? RetypedEditorProps<T>[K]
//     : T[K]
// }

// RetypedEditorProps<T> &
//   Omit<T, keyof RetypedEditorProps<T>>

type DefinePlugin<T extends SinkPluginBaseTypes> = {
  type: "link"
  editor: (editor: DefineTypedEditor<T>) => Partial<DefineTypedEditor<T>>
  slateProps: (editor: T["Editor"], props: SlateProps) => SlateProps
  editableProps: (editor: T["Editor"], props: EditableProps) => EditableProps
}

type X = DefineTypedEditor<AnchorCustomTypes>

type SinkPluginBaseTypes = {
  Editor: BaseEditor
  Element: BaseElement
  Text: BaseText
}

/**
 * Define the types for a Plugin that will override (if the property exists)
 * the types found in the SinkPluginBaseTypes which is based on `slate`
 * `CustomTypes`.
 *
 * type MyPluginTypes = DefinePluginTypes<{
 *   Editor: BaseEditor & ReactEditor & HistoryEditor
 *   Element: { type: 'anchor', children: BaseText[] }
 * }>
 */
type DefinePluginCustomTypes<T extends Partial<SinkPluginBaseTypes>> = {
  [K in keyof SinkPluginBaseTypes]: K extends keyof T
    ? T[K]
    : SinkPluginBaseTypes[K]
}

/**
 * Define Custom Types for Plugin
 */

type AnchorEditor = BaseEditor & { supportsAnchors: true }

type AnchorElement = { type: "anchor"; children: BaseText[] }

type AnchorCustomTypes = DefinePluginCustomTypes<{
  Editor: AnchorEditor
  Element: AnchorElement
}>

type AnchorPlugin = DefinePlugin<AnchorCustomTypes>

// Bold Plugin
const LinkPlugin: AnchorPlugin = {
  type: "link",
  editor: (editor) => {
    type CustomEditor = Simplify<typeof editor>
    editor.supportsAnchors = true
    return {
      isInline: (element) =>
        element.type == "anchor" ? true : editor.isInline(element),
    }
  },
  slateProps: (editor: BaseSinkEditor, props: SlateProps) => {
    return props
  },
  editableProps: (
    editor: BaseSinkEditor,
    props: EditableProps
  ): EditableProps => {
    return props
  },
}

// types for Cloud Plugin
type CloudEditor = any

const CloudPlugin = ({
  authToken,
}: {
  authToken: string
  maxWidth: Resolvable<number, [CloudEditor]>
}) => {
  return (editor: any): any => {
    return { editor }
  }
}

/**
 * The sink config is defined outside `MyEditor` because it serves two
 * purposes:
 *
 * 1. Define the `CustomTypes` which needs to be done outside a Component
 * 2. Configuration for `useSlateSink`
 */
const mySink = createSink(
  LinkPlugin,
  CloudPlugin({ authToken: "PRTV_xxxx_xxxx", maxWidth: 640 })
)

type MySink = typeof mySink

/**
 * Custom Types for Slate
 *
 * We defined Slate's Custom Types using whatever custom types we usually use
 * and then we add SinkEditor, SinkElement and SinkText
 */
declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor & SinkEditor<MySink>
    Element: BaseElement & SinkElement<MySink>
    Text: BaseText & SinkText<MySink>
  }
}

/**
 * The Component
 */
export const MyEditor = () => {
  const { editor, Sink } = useSlateSink({
    /**
     * passed as a function so that it is only called once (with useState)
     *
     * Note that this is optional. By default it uses
     * withReact(withHistory(createEditor()))
     */
    editor: () => withReact(withHistory(createEditor())),
    /**
     * passed as a function so that it is only called once (with useState)
     */
    initialValue: () => [{ type: "paragraph", children: [{ text: "Hello" }] }],
    sink: mySink,
  })

  return (
    <Sink.Slate editor={editor}>
      <Sink.Editable renderElement={renderElement} />
    </Sink.Slate>
  )
}
