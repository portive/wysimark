import { RefObject } from "react"

/**
 * Similar to a DOMRect but is just a plain JavaScript object.
 *
 * This is useful because we can use a Rect to represent things that a DOMRect
 * can't:
 *
 * - Fixed positioned Element Bounds
 * - Absolutely positioned Element Bounds
 * - Fixed Viewport Bounds
 * - Absolute Viewport Bounds
 */
export type Rect = {
  top: number
  left: number
  bottom: number
  right: number
  width: number
  height: number
}

/**
 * A very specific type. It takes an Object where the values are either
 * `HTMLElement` or a `ref` to an `HTMLElement`.
 *
 * - If the value is an `HTMLElement` we convert it to a `Rect`
 * - If the value is a `RefObject<HTMLElement>` we convert it to a
 *   `Rect | null`.
 *
 * This is used because when an `HTMLElement` exists, we want to convert it
 * to a `Rect`. If it is a `refer` to an `HTMLElement` though, it may or may
 * not exist at any point in time. When it does exist, we turn it into a
 * `Rect`. If it doesn't exist, we return `null`.
 *
 * This type is used by the method `mapHTMLElementLikeRecordToRectRecord`
 */
export type MapHTMLElementLikeRecordToRectRecord<
  T extends Record<string, HTMLElement | RefObject<HTMLElement>>
> = {
  [K in keyof T]: T[K] extends HTMLElement ? Rect : Rect | null
}
