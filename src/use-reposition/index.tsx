import mapValues from "just-map-values"
import { RefObject, useEffect, useRef } from "react"

import { useThrottledRefresh } from "./use-throttled-refresh"

export * from "./use-throttled-refresh"

type Rect = { top: number; left: number; width: number; height: number }

function getFixedRect(domElement: HTMLElement): Rect {
  const bounds = domElement.getBoundingClientRect()
  return {
    left: bounds.left,
    top: bounds.top,
    width: bounds.width,
    height: bounds.height,
  }
}

function getAbsoluteRect(domElement: HTMLElement): Rect {
  const rect = getFixedRect(domElement)
  rect.top = rect.top + window.scrollY
  return rect
}

/**
 * NOTE: Available only in browser
 */
export function useFixedRect(domElement: HTMLElement): Rect {
  return getFixedRect(domElement)
}

/**
 * NOTE: Available only in browser
 */

export function useAbsoluteRect(domElement: HTMLElement): Rect {
  return getAbsoluteRect(domElement)
}

export function useReposition() {
  /**
   * Create a throttled `refresh` method.
   */
  const refresh = useThrottledRefresh(250)

  /**
   * refresh on page resize or scroll (throttled)
   */
  useEffect(() => {
    window.addEventListener("resize", refresh)
    window.addEventListener("scroll", refresh)
    return () => {
      window.removeEventListener("resize", refresh)
      window.removeEventListener("scroll", refresh)
    }
  })

  return refresh
}

type MapHTMLElement<
  T extends Record<string, HTMLElement | RefObject<HTMLElement>>
> = {
  [K in keyof T]: T[K] extends Rect ? Rect : Rect | null
}

export function useAbsoluteReposition<
  T extends Record<string, HTMLElement | RefObject<HTMLElement>>,
  R
>(elementLikeRecord: T, fn: (elementRecord: MapHTMLElement<T>) => R) {
  useReposition()
  const elementRecord = mapValues(elementLikeRecord, (value) => {
    const maybeHTMLElement =
      value instanceof HTMLElement ? value : value.current
    const nextValue = maybeHTMLElement
      ? getAbsoluteRect(maybeHTMLElement)
      : null
    return nextValue
  }) as MapHTMLElement<T>

  return fn(elementRecord)
}

export function useFixedReposition<
  T extends Record<string, HTMLElement | RefObject<HTMLElement>>,
  R
>(elementLikeRecord: T, fn: (elementRecord: MapHTMLElement<T>) => R) {
  useReposition()
  const elementRecord = mapValues(elementLikeRecord, (value) => {
    const maybeHTMLElement =
      value instanceof HTMLElement ? value : value.current
    const nextValue = maybeHTMLElement ? getFixedRect(maybeHTMLElement) : null
    return nextValue
  }) as MapHTMLElement<T>

  return fn(elementRecord)
}
