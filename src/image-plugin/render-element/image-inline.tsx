import { ConstrainedRenderElementProps } from "~/src/sink"

import { $ImageInline } from "../styles/image-inline-styles"
import { ImageInlineElement } from "../types"
import { Image } from "./image"

export function ImageInline({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<ImageInlineElement>) {
  return (
    <span {...attributes} style={{ display: "inline-block" }}>
      <$ImageInline contentEditable={false}>
        <Image element={element} inline />
      </$ImageInline>
      {children}
    </span>
  )
}
