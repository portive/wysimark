import { getFixedRect } from "./get-fixed-rect"
import { Rect } from "../types"

export function getAbsoluteRect(domElement: HTMLElement): Rect {
  const rect = getFixedRect(domElement)
  const { scrollY } = window
  return Object.assign(rect, {
    top: rect.top + scrollY,
    bottom: rect.bottom + scrollY,
  })
}
