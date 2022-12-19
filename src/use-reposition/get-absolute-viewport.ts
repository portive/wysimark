import { getFixedViewport } from "./get-fixed-viewport"
import { Rect } from "./types"

export function getAbsoluteViewport(): Rect {
  const rect = getFixedViewport()
  return Object.assign(rect, {
    top: window.scrollY,
    bottom: window.scrollY + rect.height,
  })
}
