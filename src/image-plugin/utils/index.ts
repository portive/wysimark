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
 * A more intuitive of ensuring a value is within a min/max range.
 */
export function minMax({
  value,
  min,
  max,
}: {
  value: number
  min: number
  max: number
}): number {
  if (!(max >= min)) throw new Error(`Expected max >= min but is not`)
  return Math.max(min, Math.min(max, value))
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
