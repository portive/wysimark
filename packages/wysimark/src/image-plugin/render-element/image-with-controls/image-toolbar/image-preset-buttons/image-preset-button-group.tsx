import { Dispatch, SetStateAction } from "react"

import { $ImageButtonGroup } from "../../../../styles/image-with-controls-styles/image-buttons-styles"
import {
  ImageBlockElement,
  ImageInlineElement,
  ImageSize,
  ImageSizePreset,
} from "../../../../types"
import { ImagePresetButton } from "./image-preset-button"

export function ImagePresetButtonGroup({
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
    <$ImageButtonGroup>
      {presets.map((preset, i) => {
        return (
          <ImagePresetButton
            element={element}
            key={i}
            preset={preset}
            size={size}
            setSize={setSize}
            srcSize={srcSize}
          />
        )
      })}
    </$ImageButtonGroup>
  )
}
