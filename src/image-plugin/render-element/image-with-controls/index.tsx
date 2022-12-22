import { clsx } from "clsx"
import { useState } from "react"
import { useSelected } from "slate-react"

import { useUpload } from "~/src/upload-plugin/store"

import {
  $Image,
  $ImageContainer,
} from "../../styles/image-with-controls-styles/image-with-controls-styles"
import { ImageBlockElement, ImageInlineElement } from "../../types"
import { ImageResizeControl } from "./image-resize-handle"
import { ImageSizeStatus } from "./image-size-status"

/**
 * The `Image` Component is responsible for:
 *
 * - rendering the image
 * - displaying the UI for the image including
 *   - resize controls
 *   - current width/height
 *   - image preset size controls
 *
 * It's outer $ImageContainer is represented as an `inline-block` and is
 * placed inside a `block` element for the `image-block` and a `span` element
 * for `image-inline`.
 */
export function ImageWithControls({
  element,
}: {
  element: ImageBlockElement | ImageInlineElement
  inline?: boolean
}) {
  const upload = useUpload(element.url)

  const selected = useSelected()

  const [isDragging, setIsDragging] = useState(false)
  const [size, setSize] = useState(
    element.srcWidth && element.srcHeight && element.width && element.height
      ? { width: element.width, height: element.height }
      : null
  )

  /**
   * Creates a `srcSize` object if there is both a srcWidth and a srcHeight.
   * This also acts as an indicator that the image can be resized. If there is
   * a `srcSize` present we know that the image can be resized.
   */
  const srcSize =
    element.srcWidth && element.srcHeight
      ? { width: element.srcWidth, height: element.srcHeight }
      : null

  /**
   * Show resize controls if the element is selected, it has a `size` and
   * it has a `srcSize`
   */
  const showResizeControls = selected && size && srcSize

  /**
   * Add classes for:
   *
   * - selected state
   */
  const className = clsx({
    "--selected": selected,
    "--small": size && (size.width <= 64 || size.height <= 64),
  })

  return (
    <$ImageContainer className={className}>
      <$Image src={upload.url} width={size?.width} height={size?.height} />
      {isDragging && size ? <ImageSizeStatus size={size} /> : null}
      {showResizeControls ? (
        <ImageResizeControl
          element={element}
          srcSize={srcSize}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
          size={size}
          setSize={setSize}
        />
      ) : null}
    </$ImageContainer>
  )
}
