import { Descendant } from "slate"

import { createHeadingMethods } from "./methods"

export type HeadingEditor = {
  heading: ReturnType<typeof createHeadingMethods>
}

export type HeadingElement = {
  type: "heading"
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: Descendant[]
}

export type HeadingPluginCustomTypes = {
  Name: "heading"
  Editor: HeadingEditor
  Element: HeadingElement
}
