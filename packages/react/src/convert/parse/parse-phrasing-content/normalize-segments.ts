import { Text as SlateText } from "slate"

import { Segment } from "../../types"
import { normalizeSegment } from "./normalize-segment"

/**
 * After generating segments by just pushing them onto an Array, we want to get
 * them into proper form for use in Slate.
 *
 * Slate expects its data structure to follow [certain
 * rules](https://docs.slatejs.org/concepts/11-normalizing) and we make sure
 * they are followed.
 *
 * These are the rules for segments (text/inline) that we enforce:
 *
 * - Rule 1: All Element nodes must contain at least one Text descendant
 * - Rule 2: Two adjacent texts with the same custom properties will be merged.
 * - Rule 4: Inline nodes cannot be the first or last child of a parent block,
 *   nor can it be next to another inline node in the children array.
 *
 */
export function normalizeSegments(segments: Segment[]): Segment[] {
  const nextSegments: Segment[] = []

  /**
   * Rule 2:
   *
   * Build up the nextSegments. The `normalizeSegment` function called inside
   * does the work of checking to see if the segment before is a Text with the
   * exact same marks. If it is, then instead of pushing on another Text
   * segment, it merges the current segment Text into the previous Segment.
   *
   * Rule 4 (part 3):
   *
   * It also checks for two inline elements and inserts an empty Text node
   * between them by emitting a `{text: ''}` before the inline Element segment.
   */
  for (let i = 0; i < segments.length; i++) {
    /**
     * When we provide the `prevSegment` notice that is is actually the
     * `prevSegment` from our `nextSegments` and not `segments[i-1]`.
     *
     * This is important because `normalizeSegment` will mutate `prevSegment`
     */

    const mutablePrevSegment: Segment | undefined =
      nextSegments[nextSegments.length - 1]
    nextSegments.push(...normalizeSegment(segments[i], mutablePrevSegment))
  }

  /**
   * Rule 1:
   *
   * If there are no segments, we ensure there is at least one by inserting an
   * empty Text
   */
  if (nextSegments.length === 0) nextSegments.push({ text: "" })
  /**
   * Rule 4 (part 1 & part 2):
   *
   * If the first segment isn't Text, insert a Text
   */
  if (!SlateText.isText(nextSegments[0])) nextSegments.unshift({ text: "" })
  /**
   * Rule 4:
   *
   * If the last segment isn't Text, insert a Text
   */
  if (!SlateText.isText(nextSegments[nextSegments.length - 1]))
    nextSegments.push({ text: "" })
  return nextSegments
}
