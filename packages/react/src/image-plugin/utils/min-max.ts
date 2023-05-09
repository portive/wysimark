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
