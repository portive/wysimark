import { ConstrainedRenderElementProps } from "~/src/sink"

import { $ImageBlock } from "../styles/image-block-styles"
import { ImageBlockElement, ImageSizePreset } from "../types"
import { ImageWithControls } from "./image-with-controls"

export const presets: ImageSizePreset[] = [
  /**
   * Pixel Presets
   */
  { name: "S", type: "bounds", width: 160, height: 160 },
  { name: "M", type: "bounds", width: 320, height: 320 },
  { name: "L", type: "bounds", width: 640, height: 640 },
  /**
   * Scale Presets
   */
  { name: "⅓", type: "scale", scale: 1 / 3 },
  { name: "½", type: "scale", scale: 0.5 },
  { name: "Full", type: "scale", scale: 1 },
]

export function ImageBlock({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<ImageBlockElement>) {
  return (
    <div {...attributes}>
      <$ImageBlock contentEditable={false}>
        <ImageWithControls element={element} presets={presets} />
      </$ImageBlock>
      {children}
    </div>
  )
}
