import { Editor } from "slate"
import { ReactEditor } from "slate-react"

import { ImageSize, ImageSizePreset } from "../types"

/**
 * Takes a src image and resizes it to the exact width while preserving the
 * aspect ratio.
 *
 * NOTE: This is resizing to exact width, and not to inside width.
 */
export function resizeToWidth(width: number, srcSize: ImageSize): ImageSize {
  width = Math.round(width)
  const aspect = srcSize.width / srcSize.height
  return { width, height: Math.round(width / aspect) }
}

/**
 * Takes a src image and resizes it to the exact height while preserving the
 * aspect ratio.
 *
 * NOTE: This is resizing to exact height, and not to inside height.
 */
export function resizeToHeight(height: number, srcSize: ImageSize): ImageSize {
  height = Math.round(height)
  const aspect = srcSize.width / srcSize.height
  return { width: Math.round(height * aspect), height }
}

/**
 * Intuitive way of taking a size and a bounds and shrinking the size within
 * the given bounds if necessary.
 */
export function resizeInBounds(size: ImageSize, bounds: ImageSize): ImageSize {
  const aspect = size.width / size.height
  const boundsAspect = bounds.width / bounds.height
  if (aspect >= boundsAspect) {
    if (size.width > bounds.width) {
      return resizeToWidth(bounds.width, size)
    }
  } else {
    if (size.height > bounds.width) {
      return resizeToHeight(bounds.height, size)
    }
  }
  return size
}

/**
 * Takes an image size and an image resize preset and calculates the size of
 * the image when the preset is applied.
 *
 * Notably, there are two `preset` algorithms.
 *
 * - `bounds` which sets a maximum width/height and we find the maximum image
 *   size that fits within those bounds.
 *
 * - `scale` which multiples the width/height by a given scale. Note that by
 *   convention that scale should be 1 or less.
 */
export function resizeInPreset(
  size: ImageSize,
  srcSize: ImageSize,
  preset: ImageSizePreset
): ImageSize {
  switch (preset.type) {
    case "bounds":
      return resizeInBounds(srcSize, preset)
    case "scale":
      return {
        width: Math.round(srcSize.width * preset.scale),
        height: Math.round(srcSize.height * preset.scale),
      }
  }
}

/**
 * Takes an editor object and returns the maximum width that elements inside of
 * the editor can be rendered at without overflowing.
 *
 * We get the `clientWidth` which is the "box" without the border but including
 * the padding. We then subtract the padding to get the value we want.
 */
export function getEditorWidth(editor: Editor) {
  const element = ReactEditor.toDOMNode(editor, editor)
  const computed = getComputedStyle(element)
  const padding =
    parseInt(computed.paddingLeft) + parseInt(computed.paddingRight)
  return element.clientWidth - padding
}
