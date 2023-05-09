import React, { Dispatch, SetStateAction } from "react"

import { $ImageToolbar } from "../../../styles/image-with-controls-styles/image-toolbar-styles"
import {
  ImageBlockElement,
  ImageInlineElement,
  ImageSize,
  ImageSizePreset,
} from "../../../types"
import { ImagePresetButtonGroup } from "./image-preset-buttons/image-preset-button-group"
import { ImageTypeButtonGroup } from "./image-type-buttons/image-type-button-group"

/**
 * The ImageToolbar appears above an image when the image is selected.
 *
 * It includes:
 *
 * - A set of image resize presets when clicked resizes the image to the preset
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
      <ImageTypeButtonGroup element={element} />
      <ImagePresetButtonGroup
        element={element}
        size={size}
        setSize={setSize}
        srcSize={srcSize}
        presets={presets}
      />
    </$ImageToolbar>
  )
}
