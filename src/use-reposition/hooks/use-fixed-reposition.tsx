import { RefObject } from "react"

import { getFixedRect } from "../get-methods/get-fixed-rect"
import { getFixedViewport } from "../get-methods/get-fixed-viewport"
import { MapHTMLElementLikeRecordToRectRecord, Rect } from "../types"
import { useReposition } from "./use-reposition"
import { mapHTMLElementLikeRecordToRectRecord } from "../utils"

export function useFixedReposition<
  T extends Record<string, HTMLElement | RefObject<HTMLElement>>,
  R
>(
  elementLikeRecord: T,
  fn: (
    elementRecord: MapHTMLElementLikeRecordToRectRecord<T>,
    viewport: Rect
  ) => R
) {
  useReposition()
  const rectRecord = mapHTMLElementLikeRecordToRectRecord(
    elementLikeRecord,
    (element) => getFixedRect(element)
  )
  return fn(rectRecord, getFixedViewport())
}
