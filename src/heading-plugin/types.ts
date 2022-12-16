import { Descendant } from "slate"

export type HeadingEditor = {
  heading: {
    toggleHeading: (level: HeadingElement["level"]) => void
  }
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
