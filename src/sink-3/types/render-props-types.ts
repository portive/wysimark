import { BaseElement, BaseText } from "slate"

export type ConstrainedRenderElementProps<$Element extends BaseElement> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any
  element: $Element
  attributes: {
    "data-slate-node": "element"
    "data-slate-inline"?: true
    "data-slate-void"?: true
    dir?: "rtl"
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref: any
  }
}

export type ConstrainedRenderLeafProps<$Text extends BaseText> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any
  leaf: $Text
  text: $Text
  /**
   * KEEP:
   *
   * Removed from the props given because we don't want the user to add it
   * themselves.
   *
   * Do not delete it as it's useful for reference.
   */
  // attributes: {
  //   "data-slate-leaf": true
  // }
}
