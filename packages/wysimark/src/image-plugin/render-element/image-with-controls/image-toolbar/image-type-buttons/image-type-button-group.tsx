import { $ImageButtonGroup } from "../../../../styles/image-with-controls-styles/image-buttons-styles"
import { ImageBlockElement, ImageInlineElement } from "../../../../types"
import { BlockImageTypeButton } from "./block-image-type-button"
import { InlineImageTypeButton } from "./inline-image-type-button"

export function ImageTypeButtonGroup({
  element,
}: {
  element: ImageBlockElement | ImageInlineElement
}) {
  return (
    <$ImageButtonGroup>
      <InlineImageTypeButton element={element} />
      <BlockImageTypeButton element={element} />
    </$ImageButtonGroup>
  )
}
