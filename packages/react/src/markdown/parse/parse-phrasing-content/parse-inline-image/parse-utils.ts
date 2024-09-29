/**
 * Takes a `string` in the form `640x480` (i.e. number x number) and return an
 * ImageSize object with `width` and `height`.
 */
export function parseSize(
  s: string | null
): { width: number; height: number } | null {
  if (typeof s !== "string") return null
  const sizeMatch = s.match(/^(\d+)x(\d+)$/)
  if (sizeMatch === null) return null
  return {
    width: parseInt(sizeMatch[1]),
    height: parseInt(sizeMatch[2]),
  }
}
