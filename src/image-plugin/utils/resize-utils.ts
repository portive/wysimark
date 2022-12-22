import { ImageSizePreset } from "../render-element/image-with-controls/image-resize-presets"
import { ImageSize } from "../types"

export function resizeToWidth(width: number, srcSize: ImageSize): ImageSize {
  width = Math.round(width)
  const aspect = srcSize.width / srcSize.height
  return { width, height: Math.round(width / aspect) }
}

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
        width: srcSize.width * preset.scale,
        height: srcSize.height * preset.scale,
      }
  }
}
