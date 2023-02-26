import { AnchorElement } from "wysimark/src/anchor-plugin"

import { Segment } from "../../../types"
import { serializeLine } from "../serialize-line"
import { getCommonAnchorMarks } from "../utils"

export function serializeAnchor(anchor: AnchorElement): string {
  const commonAnchorMarks = getCommonAnchorMarks(anchor.children as Segment[])
  return (
    /**
     * TODO: Handle anchor children more elegantly in serializeAnchor.
     *
     * We type cast `children` as `Segment` here because the children of an
     * `anchor` is limited to be Inline types. There are two things to do
     * related to this though:
     *
     * - [ ] consider fixing the `anchor` type to actually limit the
     *   children as expected.
     * - [ ] consider expanding the definition of `Segment` to include
     *   inline images as that is an acceptable inline value which is
     *   currently not defined as part of Segment.
     */
    `[${serializeLine(
      anchor.children as Segment[],
      commonAnchorMarks,
      commonAnchorMarks
    )}](${anchor.href})`
  )
}
