import mapValues from "just-map-values"
import { RefObject } from "react"

import { MapHTMLElementLikeRecordToRectRecord, Rect } from "./types"

/**
 * Tries to convert an `HTMLElement` to a `Rect` using the supplied
 * `convertElementToRect` method.
 *
 * The input Record can have as its values either an `HTMLElement` or a
 * `RefObject<HTMLElement>`. When it is a `RefObject` then it may or may not
 * refer to an `HTMLElement` so...
 *
 * - If the value is an `HTMLElement` we convert it to a `Rect`
 * - If the value is a `RefObject<HTMLElement>` we convert it to a
 *   `Rect | null` depending on whether the `RefObject` contains the
 *   `HTMLElement`.
 */
export function mapHTMLElementLikeRecordToRectRecord<
  T extends Record<string, HTMLElement | RefObject<HTMLElement>>
>(
  elementLikeRecord: T,
  converElementToRect: (element: HTMLElement) => Rect
): MapHTMLElementLikeRecordToRectRecord<T> {
  const rectRecord = mapValues(elementLikeRecord, (value) => {
    const maybeHTMLElement =
      value instanceof HTMLElement ? value : value.current
    const nextValue = maybeHTMLElement
      ? converElementToRect(maybeHTMLElement)
      : null
    return nextValue
  }) as MapHTMLElementLikeRecordToRectRecord<T>
  return rectRecord
}
