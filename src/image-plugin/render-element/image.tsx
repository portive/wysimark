import { clsx } from "clsx"
import { styled } from "goober"
import { forwardRef, useState } from "react"
import { useSelected } from "slate-react"

import { useUpload } from "~/src/upload-plugin/store"

import { $Image, $ImageContainer } from "../styles/image-styles"
import { ImageBlockElement, ImageInlineElement, ImageSize } from "../types"
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

  const className = clsx({
    "--selected": selected,
    "--inline": inline,
    "--small": size && (size.width <= 64 || size.height <= 64),
  })
  return (
    <$ImageContainer className={className}>
      <$Image
        className={className}
        src={upload.url}
        width={size?.width}
        height={size?.height}
      />
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

const $ImageSizeStatus = styled("div", forwardRef)`
  position: absolute;
  bottom: 4px;
  .--small > & {
    bottom: calc(-2em - 4px);
  }
  transition: bottom 250ms;
  left: 4px;
  font-size: 0.625em;
  line-height: 2em;
  padding: 0 0.5em;
  color: white;
  background: #404040;
  outline: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 0.5em;
  white-space: nowrap;

  /* force numbers to be monospaced for better alignment */
  font-variant-numeric: tabular-nums;
`

function ImageSizeStatus({ size }: { size: ImageSize }) {
  return (
    <$ImageSizeStatus>
      {size.width} &times; {size.height}
    </$ImageSizeStatus>
  )
}
