import { RefObject } from "react"

import { getAbsoluteRect } from "../get-methods/get-absolute-rect"
import { getAbsoluteViewport } from "../get-methods/get-absolute-viewport"
import { MapHTMLElementLikeRecordToRectRecord, Rect } from "../types"
import { mapHTMLElementLikeRecordToRectRecord } from "../utils"
import { useReposition } from "./use-reposition"

/**
 * For `absolute` positioning.
 *
 * For `fixed` positioning see `useFixedReposition`
 *
 * An all-in-one hook that helps you position elements relative to other
 * elements and to the viewport.
 *
 * It automatically refreshes when the user scrolls or the window is resized.
 *
 * The method takes as its first argument an object where the values can be
 * either an `HTMLElement` or a ref to an `HTMLElement` created using
 * `useRef(null)`.
 *
 * As the second argument, it takes a function that you use to process
 * everything and return a value you can use to position the element. It's
 * typical to return this in the form of a `style` Object but it doesn't have
 * to be.
 *
 * That function you pass in can take these arguments:
 *
 * - The first argument is in the same shape as the object of `HTMLElement` or
 *   `ref` to `HTMLElement`; however, instead, its values are `Rect` or
 *   if the original value was a `ref`, a `Rect | null`. The value can be
 *   `null` because a `ref` can potentially contain no value and hence we can't
 *   find a `Rect` for it.
 * - The second argument is a `Rect` representing the viewport of the `window`.
 * - The third argument is a `refresh` method you can call to force a
 *   refresh. The refresh is throttled in sync with the ot
 */
export function useAbsoluteReposition<
  T extends Record<string, HTMLElement | RefObject<HTMLElement>>,
  NV
>(
  elementLikeRecord: T,
  fn: (
    elementRecord: MapHTMLElementLikeRecordToRectRecord<T>,
    viewport: Rect,
    refresh: () => void
  ) => NV
) {
  const refresh = useReposition()
  const rectRecord = mapHTMLElementLikeRecordToRectRecord(
    elementLikeRecord,
    (element) => getAbsoluteRect(element)
  )
  return fn(rectRecord, getAbsoluteViewport(), refresh)
}
