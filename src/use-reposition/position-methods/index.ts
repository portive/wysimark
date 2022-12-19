import { Rect } from "../types"

/**
 * Takes a source Rect of the Element you are trying to position and makes
 * sure it is inside the container Rect.
 *
 * The source Rect can be `null` (e.g. when the `ref` hasn't been set yet) and
 * while it is, the item is positioned far off to the left of the screen.
 *
 * Can specify an optional `margin` as well.
 */
export function positionInside(
  src: Rect | null,
  container: Rect,
  pos: { left: number; top: number },
  { margin = 0 }: { margin?: number } = {}
) {
  if (src == null) return { ...pos, left: -1024 }
  const right = pos.left + src.width
  if (right <= container.right - margin) return pos
  return { ...pos, left: container.right - src.width - margin }
}
