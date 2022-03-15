import cloneDeep from "lodash/cloneDeep"
import isEqual from "lodash/isEqual"
import omit from "lodash/omit"
import { CustomText, Segment } from "~/editor/types"
import { Mark } from "~/editor/types"
import { isLinkSegment, isTextSegment } from "../serialize/serialize-utils"
import { isSpaceSegment, isWord } from "../serialize/serialize-utils"
import { diffMarksExceptCode } from "../utils/diff-marks"
import {
  getMarkPropsFromMarks,
  getMarkPropsFromSegment,
} from "../utils/get-mark-props"

const BOUNDARY_REGEXP = new RegExp(/(\s+|\S+)/g)

/**
 * Split text segments at their whitespace boundaries.
 * Split link children at their whiespace boundaries.
 * Do not split code segments.
 *
 * ' a world ' => [' ', 'a', ' ', 'world']
 *
 */
export function splitSegmentsAtBoundaries(segments: Segment[]): Segment[] {
  const nextSegments: Segment[] = []
  for (const segment of segments) {
    if (isTextSegment(segment)) {
      if (segment.code) {
        /**
         * If it's a code segment, leave everything in it alone
         */
        nextSegments.push(segment)
      } else {
        /**
         * If it's not a code segment, then do some splitting
         */
        const matches = segment.text.match(BOUNDARY_REGEXP) || []
        for (const match of matches) {
          if (isWord(match)) {
            nextSegments.push({ ...segment, text: match })
          } else {
            nextSegments.push({ text: match })
          }
        }
      }
    } else if (isLinkSegment(segment)) {
      nextSegments.push({
        ...segment,
        children: splitSegmentsAtBoundaries(segment.children) as CustomText[],
      })
    } else {
      // throw new Error("Unhandled segment type")
      throw new Error(`Unhandled segment type ${JSON.stringify(segment)}`)
    }
  }
  return nextSegments
}

/**
 * Merge adjacents spaces unless there are `code` segments
 *
 * ['a', ' ', ' ', 'b'] => ['a', '  ', 'b']
 */
export function mergeSpaceSegments(segments: Segment[]): Segment[] {
  const nextSegments: Segment[] = []

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    const lastSegment: Segment | undefined = segments[i - 1]
    if (isLinkSegment(segment)) {
      nextSegments.push({
        ...segment,
        children: mergeSpaceSegments(segment.children) as CustomText[],
      })
      continue
    } else if (isTextSegment(segment)) {
      /**
       * If the last segment is a space and the next segment is a space and
       * neither of those segments are code segments, then merge the spaces
       * together.
       */
      if (
        isSpaceSegment(lastSegment) &&
        isSpaceSegment(segment) &&
        !segment.code &&
        !lastSegment.code
      ) {
        lastSegment.text = `${lastSegment.text}${segment.text}`
        continue
      }
      nextSegments.push(segment)
      // } else if (isCodeSegment(segment)) {
      //   nextSegments.push(segment)
    } else {
      throw new Error("Unhandled segment type")
    }
  }
  return nextSegments
}

/**
 * Remove all the empty link segments (no text)
 */
function removeEmptyLinkSegments(segments: Segment[]): Segment[] {
  const nextSegments: Segment[] = []
  for (const segment of segments) {
    /** Remove empty segments */
    if (
      isLinkSegment(segment) &&
      (segment.children.length === 0 ||
        (segment.children.length === 1 && segment.children[0].text === ""))
    ) {
      continue
    }
    nextSegments.push(segment)
  }
  return nextSegments
}

/**
 * Removing leading and trailing spaces but always leave at least one
 *
 * [' ', 'a', ' '] => ['a']
 * [' '] => ['']
 */
export function trimSegments(
  segments: Segment[],
  { trimStart, trimEnd }: { trimStart: boolean; trimEnd: boolean }
): Segment[] {
  const nextSegments = cloneDeep(segments)
  for (const segment of nextSegments) {
    if (isLinkSegment(segment)) {
      segment.children = trimSegments(segment.children, {
        trimStart,
        trimEnd,
      }) as CustomText[]
    }
  }
  const firstSegment = nextSegments[0]
  if (trimStart && isSpaceSegment(firstSegment) && !firstSegment.code) {
    nextSegments.shift()
  }
  const lastSegment = nextSegments[nextSegments.length - 1]
  if (trimEnd && isSpaceSegment(lastSegment) && !lastSegment.code) {
    nextSegments.pop()
  }
  if (nextSegments.length === 0) nextSegments.push({ text: "" })
  return nextSegments
}

/**
 * Add marks to the space segments depending on its surrounding segments.
 *
 * Must take into account that mark tokens in Markdown must surround only
 * non-space characters
 */
export function remarkSpaceSegments(segments: Segment[]): Segment[] {
  const nextSegments: Segment[] = []
  let prevMarks: Mark[] = []
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    if (isTextSegment(segment)) {
      if (isSpaceSegment(segment)) {
        /**
         * We note whether the space is a code segment or not at the beginning
         * because we want to forcefully preserve this later
         */
        const isCodeMark = !!segment.code
        /**
         * Remark the space segment based on the previous marks and the next marks
         */
        const nextSegment = segments[i + 1] as Segment | undefined
        const nextMarkProps = getMarkPropsFromSegment(nextSegment)
        const { innerMarks } = diffMarksExceptCode({
          prevMarks,
          nextMarkProps: nextMarkProps,
        })
        prevMarks = innerMarks
        const markProps = getMarkPropsFromMarks(innerMarks)
        /**
         * This preserved whether the space was originally a code segment or
         * not. We treat code marks a little differently for spaces because
         * of how Markdown treats code marks. Namely, code spaces are visible
         * whereas other marks are not. Also, backticks that are used as tokens
         * for code marks don't have the requirement of not having a space
         * inside. Code marks work in all cases whereas other mark types do not.
         */
        if (isCodeMark) {
          markProps.code = true
        } else {
          delete markProps.code
        }
        nextSegments.push({ text: segment.text, ...markProps })
        continue
      } else {
        /**
         * Set prev marks smartly which should text into account mark order
         */
        nextSegments.push({ ...(segment as CustomText) })
        const markProps = getMarkPropsFromSegment(segment)
        const { nextMarks } = diffMarksExceptCode({
          prevMarks,
          nextMarkProps: markProps,
        })
        prevMarks = nextMarks
      }
    } else if (isLinkSegment(segment)) {
      /**
       * If we're in a link, remark the inside of the link
       */
      nextSegments.push({
        ...segment,
        children: remarkSpaceSegments(segment.children) as CustomText[],
      })
    }
  }
  return nextSegments
}

export function mergeSegmentsByMark(segments: Segment[]): Segment[] {
  const nextSegments: Segment[] = []
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    const lastSegment = nextSegments[nextSegments.length - 1]
    if (isLinkSegment(segment)) {
      const children = mergeSegmentsByMark(segment.children) as CustomText[]
      nextSegments.push({
        ...segment,
        children,
      })
    } else if (
      isTextSegment(lastSegment) &&
      isTextSegment(segment) &&
      isEqual(omit(lastSegment, ["text"]), omit(segment, ["text"]))
    ) {
      lastSegment.text = `${lastSegment.text}${segment.text}`
    } else {
      nextSegments.push({ ...segment })
    }
  }
  return nextSegments
}

/**
 * Normalize a line by:
 *
 * - Moving marks so that they are around words
 * - Removing empty link segments
 * - Removing trailing spaces at start and end of lines
 *
 * Generally this means that once a document is normalized it is prepped for
 * serialization. After it's serialized and turned back to JSON, the JSON
 * should match the normalized line perfectly.
 */

export function normalizeLine(segments: Segment[]): Segment[] {
  const splitSegments = splitSegmentsAtBoundaries(segments)
  const mergedSpaceSegments = mergeSpaceSegments(splitSegments)
  const emptiedSegments = removeEmptyLinkSegments(mergedSpaceSegments)
  const trimmedSegments = trimSegments(emptiedSegments, {
    trimStart: true,
    trimEnd: true,
  })
  const remarkedSpaceSegments = remarkSpaceSegments(trimmedSegments)
  const mergedByMarkSegments = mergeSegmentsByMark(remarkedSpaceSegments)
  return mergedByMarkSegments
}
