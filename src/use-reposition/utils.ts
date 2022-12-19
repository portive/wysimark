import mapValues from "just-map-values"
import { RefObject } from "react"

import { MapHTMLElementLikeRecordToRectRecord, Rect } from "./types"

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
