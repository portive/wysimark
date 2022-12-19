import { Rect } from "../types"
import { getFixedViewport } from "./get-fixed-viewport"

export function getAbsoluteViewport(): Rect {
  const rect = getFixedViewport()
  return Object.assign(rect, {
    top: window.scrollY,
    bottom: window.scrollY + rect.height,
  })
}
