import { Rect } from "../types"

/**
 * Returns a `Rect` representing the `fixed` positioning coordinates of
 * the window viewport.
 */
export function getFixedViewport(): Rect {
  /**
   * Get the width of the viewport not including the scrollbar
   *
   * https://stackoverflow.com/a/25298418
   */
  const width =
    document.documentElement.clientWidth || document.body.clientWidth
  return {
    top: 0,
    right: width,
    bottom: window.innerHeight,
    left: 0,
    width: width,
    height: window.innerHeight,
  }
}
