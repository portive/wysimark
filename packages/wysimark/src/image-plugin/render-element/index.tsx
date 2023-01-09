import { ConstrainedRenderElementProps } from "~/src/sink"

import { ImageBlockElement, ImageInlineElement } from "../types"
import { ImageBlock } from "./image-block"
import { ImageInline } from "./image-inline"

export function renderElement({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<ImageBlockElement | ImageInlineElement>) {
  switch (element.type) {
    case "image-block":
      return (
        <ImageBlock element={element} attributes={attributes}>
          {children}
        </ImageBlock>
      )
    case "image-inline":
      return (
        <ImageInline element={element} attributes={attributes}>
          {children}
        </ImageInline>
      )
  }
}
