import omit from "lodash/omit"
import pick from "lodash/pick"
import { CustomText, MarkProps, Segment } from "~/editor/types"
import { Mark } from "~/editor/types"
import { isLinkSegment, isTextSegment } from "../serialize/serialize-utils"
import { isSpaceSegment } from "../serialize/serialize-utils"

/**
 * Takes a TextSegment and returns its marks in preferred order.
 */
export function getMarkPropsFromText(text: CustomText): MarkProps {
  return omit(text, ["text"])
}

interface SegmentWithChildren {
  children: CustomText[]
  [key: string]: unknown
}

export function getMarkPropsFromChildren(
  segment: SegmentWithChildren
): MarkProps {
  const segments = segment.children
  let markProps: MarkProps = getMarkPropsFromText(segments[0])
  for (let i = 1; i < segments.length; i++) {
    const segment = segments[i]
    if (isSpaceSegment(segment)) continue
    const currentMarks = getMarkPropsFromText(segment)
    markProps = pick(markProps, Object.keys(currentMarks))
  }
  return markProps
}

/**
 * Takes a Segment and returns its marks in preferred order.
 *
 * Must handle segments with children
 */
export function getMarkPropsFromSegment(segment?: Segment): MarkProps {
  if (segment === undefined) return {}
  if (isTextSegment(segment)) {
    return getMarkPropsFromText(segment)
  } else if (isLinkSegment(segment)) {
    return getMarkPropsFromChildren(segment)
  } else {
    throw new Error(`Unhandled segment ${JSON.stringify(segment)}`)
  }
}

export function getMarkPropsFromMarks(marks: Mark[]): MarkProps {
  return marks.reduce((o: MarkProps, mark) => {
    o[mark] = true
    return o
  }, {})
}
