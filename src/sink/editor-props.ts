import { BaseElement, NodeEntry } from "slate"

export type EditorProps<$Element extends BaseElement> = {
  children: $Element[]
  isInline: (element: $Element) => boolean
  isVoid: (element: $Element) => boolean
  markableVoid: (element: $Element) => boolean
  normalizeNode: (entry: NodeEntry) => void
  getFragment: () => $Element[]
  insertFragment: (fragment: $Element[]) => void
  insertNode: (node: $Element) => boolean
}
