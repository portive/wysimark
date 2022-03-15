import { CustomText, LinkElement, Segment } from "~/editor/types"
import { Part } from "../convert-types"

/**
 * Shortcut for quickly making a token
 */
export function token(markdown: string, string: string): Part {
  return {
    markdown,
    string,
  }
}

const SPACE_REGEXP = new RegExp(/^\s+$/)

/**
 * Is this text pure spaces
 */
export function isSpace(text: string) {
  return SPACE_REGEXP.test(text)
}

const NON_SPACE_REGEXP = new RegExp(/^\S+$/)

/**
 * Is this text pure non-spaces
 */
export function isWord(text: string) {
  return NON_SPACE_REGEXP.test(text)
}

/**
 * Is this a text segment
 */
export function isTextSegment(segment?: Segment): segment is CustomText {
  if (segment == null) return false
  return segment != null && "text" in segment
}

/**
 * Is this a text segment that contains pure spaces
 */
export function isSpaceSegment(segment?: Segment): segment is CustomText {
  return (
    segment !== undefined && isTextSegment(segment) && isSpace(segment.text)
  )
}

/**
 * Is this a text segment that contains pure non-spaces
 */
export function isWordSegment(segment?: Segment): segment is CustomText {
  return segment !== undefined && isTextSegment(segment) && isWord(segment.text)
}

/**
 * Is this a link segment
 */
export function isLinkSegment(
  segment?: Segment
): segment is LinkElement {
  return segment != null && "type" in segment && segment.type === "link"
}
