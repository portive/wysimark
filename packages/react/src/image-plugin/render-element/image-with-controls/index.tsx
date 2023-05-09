import { clsx } from "clsx"
import React, { useState } from "react"
import { useSelected } from "slate-react"

import { useUpload } from "~/src/upload-plugin/store"

import {
  $Image,
  $ImageContainer,
} from "../../styles/image-with-controls-styles/image-with-controls-styles"
import {
  ImageBlockElement,
  ImageInlineElement,
  ImageSizePreset,
} from "../../types"
import { ImageResizeControl } from "./image-resize-controls/image-resize-control"
import { ImageSizeStatus } from "./image-size-status/image-size-status"
import { ImageToolbar } from "./image-toolbar/image-toolbar"

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
  presets,
}: {
  element: ImageBlockElement | ImageInlineElement
  presets: ImageSizePreset[]
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
  const showControls = selected && size && srcSize

  /**
   * Add classes for different states.
   */
  const className = clsx({
    "--selected": selected,
    "--dragging": isDragging,
    "--small": size && (size.width <= 64 || size.height <= 64),
    "--loaded": upload.status === "success",
  })

  /**
   * The purpose of the surrounding $ImageContainer is simply to surround the
   * image tightly so that we can place the other control elements relative
   * to the image.
   *
   * In order to do this, the $ImageContainer must be an `inline-block` or else
   * space gets added on the inside of the container.
   *
   * NOTE:
   *
   * Everything inside the $ImageContainer must be safe to insert into a
   * `<p>` tag which means `<div>` tags are not allowed. Use `<span>` tags
   * instead, even if they are blocks. This is because we get some invalid
   * nested warning otherwise as `<div>` tags are not supposed to be children
   * of `<p>` tags.
   */
  return (
    <$ImageContainer className={className}>
      <$Image src={upload.url} width={size?.width} height={size?.height} />
      {showControls ? (
        <ImageToolbar
          element={element}
          size={size}
          setSize={setSize}
          srcSize={srcSize}
          presets={presets}
        />
      ) : null}
      {/**
       * Show the size status bar only when the user is dragging to resize the
       * image.
       */}
      {isDragging && size ? <ImageSizeStatus size={size} /> : null}
      {showControls ? (
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
