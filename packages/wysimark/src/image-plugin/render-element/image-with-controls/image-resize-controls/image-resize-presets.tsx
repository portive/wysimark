import { Dispatch, SetStateAction } from "react"

import { $ImageButtons } from "../../../styles/image-with-controls-styles/image-buttons-styles"
import {
  ImageBlockElement,
  ImageInlineElement,
  ImageSize,
  ImageSizePreset,
} from "../../../types"
import { ImageResizePreset } from "./image-resize-preset"

export function ImageResizePresets({
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
    <$ImageButtons>
      {presets.map((preset, i) => {
        return (
          <ImageResizePreset
            element={element}
            key={i}
            preset={preset}
            size={size}
            setSize={setSize}
            srcSize={srcSize}
          />
        )
      })}
    </$ImageButtons>
  )
}
