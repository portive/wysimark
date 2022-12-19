import { RefObject } from "react"

import { getAbsoluteRect } from "../get-methods/get-absolute-rect"
import { getAbsoluteViewport } from "../get-methods/get-absolute-viewport"
import { MapHTMLElementLikeRecordToRectRecord, Rect } from "../types"
import { useReposition } from "./use-reposition"
import { mapHTMLElementLikeRecordToRectRecord } from "../utils"

export function useAbsoluteReposition<
  T extends Record<string, HTMLElement | RefObject<HTMLElement>>,
  NV
>(
  elementLikeRecord: T,
  fn: (
    elementRecord: MapHTMLElementLikeRecordToRectRecord<T>,
    viewport: Rect
  ) => NV
) {
  useReposition()
  const rectRecord = mapHTMLElementLikeRecordToRectRecord(
    elementLikeRecord,
    (element) => getAbsoluteRect(element)
  )
  return fn(rectRecord, getAbsoluteViewport())
}
