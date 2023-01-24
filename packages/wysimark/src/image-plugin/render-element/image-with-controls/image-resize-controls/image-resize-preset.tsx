import { clsx } from "clsx"
import { Dispatch, SetStateAction, useCallback } from "react"
import { Transforms } from "slate"
import { ReactEditor, useSlateStatic } from "slate-react"

import { $ImageButton } from "../../../styles/image-with-controls-styles/image-buttons-styles"
import {
  ImageBlockElement,
  ImageInlineElement,
  ImageSize,
  ImageSizePreset,
} from "../../../types"
import { resizeInPreset } from "../../../utils"

/**
 * Shows a single preset image sizes as defined by the `Preset` type.
 *
 * If the srcSize is smaller than the preset, clicking the preset would do
 * nothing except show the image at its full size. For this reason, the
 * preset is disabled if the srcSize is smaller than the preset.
 */
export function ImageResizePreset({
  element,
  preset,
  size,
  setSize,
  srcSize,
}: {
  element: ImageBlockElement | ImageInlineElement
  preset: ImageSizePreset
  size: ImageSize
  setSize: Dispatch<SetStateAction<ImageSize | null>>
  srcSize: ImageSize
}) {
  const editor = useSlateStatic()

  const onClick = useCallback(() => {
    const path = ReactEditor.findPath(editor, element)
    const nextSize = resizeInPreset(size, srcSize, preset)
    setSize(nextSize)
    Transforms.setNodes(editor, nextSize, { at: path })
  }, [element, preset, size, srcSize])

  const isEnabled =
    preset.type === "scale"
      ? true
      : preset.width <= srcSize.width || preset.height <= srcSize.height
  const isDisabled = !isEnabled
  const className = clsx({ "--disabled": isDisabled })

  return (
    <$ImageButton className={className} onClick={onClick}>
      {preset.name}
    </$ImageButton>
  )
}
