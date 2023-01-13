import { Text } from "../../types"
import { normalizeTextPair } from "./normalize-text-pair"

/**
 * NOTE:
 *
 * Currently, this only normalizes `Text`
 */
export function normalizeSegments(prevSegments: Text[]) {
  /**
   * Keeps a running tally of what will ultimately be the output next set of
   * segments.
   *
   * NOTE:
   *
   * Initially, we seed `nextSegments` with an empty `Text`. This is necessary
   * to help our algorithm which looks at the last entry in `nextSegments`.
   *
   * When we finish processing, we remove the initial item by returning a
   * `nextSegments.slice(1)` which omits the first item.
   */
  const nextSegments: Text[] = [{ text: "" }]
  for (const segment of prevSegments) {
    const segmentA = nextSegments[nextSegments.length - 1]
    const segmentB = segment
    const normalizedSegmentPair = normalizeTextPair(segmentA, segmentB)
    /**
     * Remove the last segment in `nextSegments` and replace it and also add
     * any additional segments provided by `normalizedSegmentPair`
     */
    nextSegments.splice(-1, 1, ...normalizedSegmentPair)
  }
  /**
   * Remove the initial empty text which we only used to provide an initial
   * value for `nextSegments` because when we `normalizeTextPair` we compare
   * the last segment in `nextSegments` to the next segment in `prevSegments`
   */
  return nextSegments.slice(1)
}
