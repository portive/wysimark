import { ConstrainedRenderElementProps } from "~/src/sink"

import { $ImageInline } from "../styles/image-inline-styles"
import { ImageInlineElement } from "../types"
import { ImageWithControls } from "./image-with-controls"

export function ImageInline({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<ImageInlineElement>) {
  return (
    <span {...attributes} style={{ display: "inline-block" }}>
      <$ImageInline contentEditable={false}>
        <ImageWithControls element={element} inline />
      </$ImageInline>
      {children}
    </span>
  )
}
