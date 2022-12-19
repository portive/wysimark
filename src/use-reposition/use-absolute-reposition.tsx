import { RefObject } from "react"

import { getAbsoluteViewport } from "./get-absolute-viewport"
import { getAbsoluteRect } from "./get-rect-methods"
import { MapHTMLElementLikeRecordToRectRecord, Rect } from "./types"
import { useReposition } from "./use-reposition"
import { mapHTMLElementLikeRecordToRectRecord } from "./utils"

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
