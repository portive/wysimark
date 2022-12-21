import { ImageSize } from "../types"

export function resizeToWidth(width: number, srcSize: ImageSize): ImageSize {
  const aspect = srcSize.width / srcSize.height
  return { width, height: width / aspect }
}

export function resizeToHeight(height: number, srcSize: ImageSize): ImageSize {
  const aspect = srcSize.width / srcSize.height
  return { width: height * aspect, height }
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
