import { Segment } from "./segment"

/**
 * Flush Types are the subset of Convertible Types that are flush to the left
 * margin. Currently, that means all the convertible types that are not
 * list item types.
 */

/**
 * Paragraph Element
 */

export type ParagraphElement = {
  type: "p"
  children: Segment[]
}

/**
 * Heading Element with levels 1 through 6
 */

export type HeadingElement = {
  type: "heading"
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: Segment[]
}

/**
 * Simpe Root Block Elements that sit flush (ie. don't have any indent).
 * Headings and Paragraphs.
 */

export type FlushBlockElement = ParagraphElement | HeadingElement
