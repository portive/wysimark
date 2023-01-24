import { useSlateStatic } from "slate-react"

import { ConstrainedRenderElementProps } from "~/src/sink"

import { $ImageBlock } from "../styles/image-block-styles"
import { ImageBlockElement } from "../types"
import { ImageWithControls } from "./image-with-controls"

export function ImageBlock({
  element,
  attributes,
  children,
}: ConstrainedRenderElementProps<ImageBlockElement>) {
  const editor = useSlateStatic()
  return (
    <div {...attributes}>
      <$ImageBlock contentEditable={false}>
        <ImageWithControls
          element={element}
          presets={editor.image.imageBlockPresets}
        />
      </$ImageBlock>
      {children}
    </div>
  )
}
