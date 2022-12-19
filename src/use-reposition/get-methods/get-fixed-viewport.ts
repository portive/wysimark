import { Rect } from "../types"

/**
 * Returns a `Rect` representing the `fixed` positioning coordinates of
 * the window viewport.
 */
export function getFixedViewport(): Rect {
  return {
    top: 0,
    right: window.innerWidth,
    bottom: window.innerHeight,
    left: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  }
}
