import { ConstrainedRenderElementProps } from "~/src/sink"

import { $ImageInline } from "../styles/image-inline-styles"
import { ImageInlineElement, ImageSizePreset } from "../types"
import { ImageWithControls } from "./image-with-controls"

export const presets: ImageSizePreset[] = [
  /**
   * Pixel Presets
   */
  { name: "16px", type: "bounds", width: 16, height: 16 },
  { name: "24px", type: "bounds", width: 24, height: 24 },
  { name: "32px", type: "bounds", width: 32, height: 32 },
  /**
   * Scale Presets
   */
  { name: "⅓", type: "scale", scale: 1 / 3 },
  { name: "½", type: "scale", scale: 0.5 },
  { name: "Full", type: "scale", scale: 1 },
]

export function ImageInline({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<ImageInlineElement>) {
  return (
    <span {...attributes} style={{ display: "inline-block" }}>
      <$ImageInline contentEditable={false}>
        <ImageWithControls element={element} presets={presets} />
      </$ImageInline>
      {children}
    </span>
  )
}
