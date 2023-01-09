import { Dispatch, SetStateAction } from "react"

import { $ImageResizePresets } from "../../styles/image-with-controls-styles/image-resize-presets-styles"
import { ImageBlockElement, ImageInlineElement, ImageSize } from "../../types"
import { ImageResizePreset } from "./image-resize-preset"

/**
 * A preset is defined either as a bound or as a scale:
 *
 * - bounds: The image will be placed within the bounds.
 * - scale: The image will be scaled to the given `scale` value. The max
 *   value should be `1`.
 */
export type ImageSizePreset =
  | { name: string; type: "bounds"; width: number; height: number }
  | { name: string; type: "scale"; scale: number }

const presets: ImageSizePreset[] = [
  { name: "S", type: "bounds", width: 160, height: 160 },
  { name: "M", type: "bounds", width: 320, height: 320 },
  { name: "L", type: "bounds", width: 640, height: 640 },

  { name: "⅓", type: "scale", scale: 1 / 3 },
  { name: "½", type: "scale", scale: 0.5 },
  { name: "Full", type: "scale", scale: 1 },
]

export function ImageResizePresets({
  element,
  size,
  setSize,
  srcSize,
}: {
  element: ImageBlockElement | ImageInlineElement
  size: ImageSize
  setSize: Dispatch<SetStateAction<ImageSize | null>>

  srcSize: ImageSize
}) {
  return (
    <$ImageResizePresets>
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
    </$ImageResizePresets>
  )
}
