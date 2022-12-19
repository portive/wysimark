import { Rect } from "./types"

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
