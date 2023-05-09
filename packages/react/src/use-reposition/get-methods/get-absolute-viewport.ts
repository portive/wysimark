import { Rect } from "../types"
import { getFixedViewport } from "./get-fixed-viewport"

/**
 * Returns a `Rect` representing the `absolute` positioning coordinates of
 * the window viewport.
 *
 * NOTE: we add `window.scrollY` to get the `absolute` position.
 */
export function getAbsoluteViewport(): Rect {
  const rect = getFixedViewport()
  return Object.assign(rect, {
    top: window.scrollY,
    bottom: window.scrollY + rect.height,
  })
}
