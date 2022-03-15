import { CustomText } from "./text"

/**
 * Link Element
 */

export type LinkElement = {
  type: "link"
  url: string
  children: CustomText[]
}

export type InlineElement = LinkElement
