import { BaseEditor, BaseElement, NodeEntry } from "slate"

export type EditorProps<$Element extends BaseElement> = {
  children: $Element[]
  isInline: (element: $Element) => boolean
  isVoid: (element: $Element) => boolean
  markableVoid: (element: $Element) => boolean
  normalizeNode: (entry: NodeEntry<$Element>) => void
  getFragment: () => $Element[]
  insertFragment: (fragment: $Element[]) => void
  insertNode: (node: $Element) => boolean
}

// /**
//  * This is a temporary type used by AugmentEditor. It lists the property typing
//  * we want in the editor that we want to override (i.e. replace) from the
//  * BaseEditor using more narrowly defined types.
//  */
//  type OverridedEditorProps<$Element extends BaseElement> = {
//   children: $Element[]
//   isInline: (element: $Element) => boolean
//   isVoid: (element: $Element) => boolean
//   markableVoid: (element: $Element) => boolean
//   normalizeNode: (entry: NodeEntry<$Element>) => void
//   getFragment: () => $Element[]
//   insertFragment: (fragment: $Element[]) => void
//   insertNode: (node: $Element) => boolean
// }

// /**
//  * Augments an existing Editor object with an Element. Mainly, this allows
//  * us to add element types to certain mthods like `isInline`.
//  */
// type AugmentEditor<
//   $Editor extends BaseEditor,
//   $Element extends BaseElement
// > = Omit<BaseElement, keyof OverridedEditorProps<$Element> & OverridedEditorProps<$Element>
