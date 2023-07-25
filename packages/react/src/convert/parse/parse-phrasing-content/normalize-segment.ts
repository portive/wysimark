import { Text as SlateText } from "slate"

import { getMarksFromText } from "../../serialize/serialize-line/utils"
import { Segment, Text } from "../../types"

/**
 * This is algorithm checks for equality of marks.
 */
export function areMarksEqual(a: Text, b: Text): boolean {
  const marksA = getMarksFromText(a)
  const marksB = getMarksFromText(b)
  /**
   *
   * WARNING:
   *
   * This algorithm is specific to our use case. a, b contain non-repeated
   * items. It will fail in other scenarios.
   *
   * > If you want to check if both arrays are equals, containing the same
   * > unsorted items (but not used multiple times)
   *
   * https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript#comment68674302_19746771
   */
  return (
    marksA.length == marksB.length && marksA.every((v) => marksB.includes(v))
  )
}

/**
 * Enforces Rule 2
 *
 * Two adjacent texts with the same custom properties will be merged.
 * https://docs.slatejs.org/concepts/11-normalizing
 *
 * normalizeSegment does most of the work for merging two segments with the same
 * marks together.
 *
 * Normally, this method emits the current `segment`; however, if the current
 * segment and the previous segment have the same marks, it instead emits an
 * empty array indicating not to add the current segment. Instead, it merges the
 * current segment text into the text of the previous segment.
 *
 * Enforce Rule 4 (part 3)
 *
 * "Inline nodes cannot be the first or last child of a parent block, nor can it
 * be next to another inline node in the children array."
 *
 * Mainly, it's enforcing the part about the fact that there must be a Text node
 * between two inline Element nodes.
 */
export function normalizeSegment(
  segment: Segment,
  /**
   * Let's be explicit that we are doing something unusual here in that we are
   * mutating the previous segment by naming it as such.
   */
  mutablePrevSegment?: Segment
): Segment[] {
  const segmentIsText = SlateText.isText(segment)
  const prevSegmentIsText = SlateText.isText(mutablePrevSegment)

  /**
   * Rule 4 (part 3):
   *
   * If there is a previous segment and the previous segment and the current
   * segment are both inline elements, we want to insert a space between them
   * which this does.
   *
   * It stops checking for merging two texts with each other since if they are
   * two inline elements, it doesn't need to check for text anymore.
   */
  if (mutablePrevSegment && !prevSegmentIsText && !segmentIsText) {
    return [{ text: "" }, segment]
  }

  /**
   * If the current segment is an Inline Element, then we can't merge it so we
   * return it as is
   */
  if (!segmentIsText) return [segment]
  /**
   * If the previous segment is an Inline Element or it's node defined, then we
   * can't merge into it so we return it as is
   */
  if (mutablePrevSegment === undefined || !prevSegmentIsText) return [segment]

  /**
   * If the two Text segments have the same marks, then merge them
   */
  const marksEqual = areMarksEqual(mutablePrevSegment, segment)
  if (marksEqual) {
    mutablePrevSegment.text = [mutablePrevSegment.text, segment.text].join("")
    return []
  }

  return [segment]
}
