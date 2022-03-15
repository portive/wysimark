/**
 * The children in a void node always has one text Node that is empty
 */

export type VoidChildren = [{ text: "" }]

/**
 * Media Element
 */

export type MediaElement = {
  type: "media"
  url: string
  alt: string
  children: VoidChildren
}

/**
 * Horizontal Rule Element
 */

export type HrElement = {
  type: "hr"
  children: VoidChildren
}

export type VoidElement = MediaElement | HrElement
