import { RenderElementProps } from "slate-react"
import { CustomElement } from "../../types"
import { Narrow } from "~/lib/ts-utils"

/**
 * Custom Render Element Prop
 */
export type CustomRenderElementProps<T extends CustomElement["type"]> = Omit<
  RenderElementProps,
  "element"
> & {
  element: Narrow<CustomElement, { type: T }>
}
