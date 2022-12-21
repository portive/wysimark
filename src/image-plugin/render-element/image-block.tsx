import { ConstrainedRenderElementProps } from "~/src/sink"

import { $ImageBlock } from "../styles/image-block-styles"
import { ImageBlockElement } from "../types"
import { Image } from "./image"

export function ImageBlock({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<ImageBlockElement>) {
  return (
    <div {...attributes}>
      <$ImageBlock contentEditable={false}>
        <Image element={element} />
      </$ImageBlock>
      {children}
    </div>
  )
}
