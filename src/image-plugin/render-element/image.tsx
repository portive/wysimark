import { clsx } from "clsx"
import { useState } from "react"
import { useSelected } from "slate-react"

import { useUpload } from "~/src/upload-plugin/store"

import { $Image, $ImageContainer } from "../styles/image-styles"
import { ImageBlockElement, ImageInlineElement } from "../types"
import { ImageResizeControl } from "./image-resize-handle"

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
export function Image({
  element,
  inline = false,
}: {
  element: ImageBlockElement | ImageInlineElement
  inline?: boolean
}) {
  const upload = useUpload(element.url)

  const selected = useSelected()

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

  const className = clsx({
    "--selected": selected,
    "--inline": inline,
    "--small": size && (size.width <= 64 || size.height <= 64),
  })
  return (
    <$ImageContainer>
      <$Image
        className={className}
        src={upload.url}
        width={size?.width}
        height={size?.height}
      />
      {showResizeControls ? (
        <ImageResizeControl
          element={element}
          srcSize={srcSize}
          size={size}
          setSize={setSize}
        />
      ) : null}
    </$ImageContainer>
  )
}
