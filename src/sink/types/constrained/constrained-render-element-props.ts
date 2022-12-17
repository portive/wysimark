import { BaseElement } from "slate"

/**
 * Creates the RenderElementProps where the element argument coming in is
 * constrained to a specific element. This is useful during the creation of
 * a Plugin where we want to isolate the choice of `Element` to whatever is
 * available for that specific plugin.
 */
export type ConstrainedRenderElementProps<Element> = Element extends BaseElement
  ? {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      children: any
      element: Element
      attributes: {
        "data-slate-node": "element"
        "data-slate-inline"?: true
        "data-slate-void"?: true
        dir?: "rtl"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref: any
      }
    }
  : never
