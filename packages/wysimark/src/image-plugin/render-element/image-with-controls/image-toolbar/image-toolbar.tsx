import React, { Dispatch, SetStateAction } from "react"

import { $ImageToolbar } from "../../../styles/image-with-controls-styles/image-buttons-container-styles"
import {
  ImageBlockElement,
  ImageInlineElement,
  ImageSize,
  ImageSizePreset,
} from "../../../types"
import { ImagePresetButtonGroup } from "../image-presets/image-preset-button-group"
import { ImageTypeButtonGroup } from "../image-types/image-type-button-group"

/**
 * The ImageToolbar appears above an image when the image is selected.
 *
 * It includes:
 *
 * - A set of image resize presets
 * - Buttons to toggle between a block image and an inline image
 */
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
    <$ImageToolbar>
      <ImagePresetButtonGroup
        element={element}
        size={size}
        setSize={setSize}
        srcSize={srcSize}
        presets={presets}
      />
      <ImageTypeButtonGroup element={element} />
    </$ImageToolbar>
  )
}
