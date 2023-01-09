import { Rect } from "../types"

/**
 * Returns a `Rect` representing the `fixed` positioning coordinates of
 * the `HTMLElement`
 */
export function getFixedRect(domElement: HTMLElement): Rect {
  const bounds = domElement.getBoundingClientRect()
  return {
    top: bounds.top,
    right: bounds.right,
    bottom: bounds.bottom,
    left: bounds.left,
    width: bounds.width,
    height: bounds.height,
  }
}
