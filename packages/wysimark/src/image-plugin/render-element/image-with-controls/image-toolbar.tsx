import React, { Dispatch, SetStateAction } from "react"

import { $ImageButtonsContainer } from "../../styles/image-with-controls-styles/image-buttons-container-styles"
import {
  ImageBlockElement,
  ImageInlineElement,
  ImageSize,
  ImageSizePreset,
} from "../../types"
import { ImageTypeButtons } from "./convert-image-type/image-convert-type-buttons"
import { ImageResizePresets } from "./image-resize-controls/image-resize-presets"

export function ImageToolbar({
  element,
  size,
  setSize,
  srcSize,
  presets,
}: {
  element: ImageBlockElement | ImageInlineElement
  size: ImageSize
  setSize: Dispatch<SetStateAction<ImageSize | null>>

  srcSize: ImageSize
  presets: ImageSizePreset[]
}) {
  return (
    <$ImageButtonsContainer>
      <ImageResizePresets
        element={element}
        size={size}
        setSize={setSize}
        srcSize={srcSize}
        presets={presets}
      />
      <ImageTypeButtons element={element} />
    </$ImageButtonsContainer>
  )
}
