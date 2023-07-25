import { Element } from "slate"

import { Segment } from "../../../types"
import { normalizeNodes } from "./normalize-nodes"
import { LineElement } from "./types"

/**
 * A very focused duplicate function that only duplicates the `children` of
 * `anchor` elements.
 *
 * It's designed this way to be fast and to avoid duplicating the entire tree
 * as only anchors have children that will be manipulated.
 */
const duplicateSegments = (segments: Segment[]): Segment[] => {
  return segments.map((segment) => {
    if (Element.isElement(segment) && segment.type === "anchor") {
      return {
        ...segment,
        children: duplicateSegments(segment.children as Segment[]),
      }
    } else {
      return segment
    }
  })
}

/**
 * Entry Point for normalizing
 */
export function normalizeLine(segments: Segment[]) {
  /**
   * We need to duplicate `segments` because `normalizeNodes` will manipulate the
   * array but the original array coming from Slate will be readOnly.
   */
  const line: LineElement = {
    type: "line",
    children: duplicateSegments(segments),
  }
  normalizeNodes([line], undefined)
  return line.children
}
