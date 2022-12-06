import React from "react"
import { BaseText, Descendant, Node, Text } from "slate"

import { createPlugin } from "~/src/sink"

export type HeadingEditor = {
  supportsHeadings: true
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
  Text: BaseText
}

export const HeadingPlugin = () =>
  createPlugin<HeadingPluginCustomTypes>((editor) => {
    editor.supportsHeadings = true
    return {
      name: "heading",
      editor: {
        isInline(element) {
          if (element.type === "heading") return false
        },
        isVoid(element) {
          if (element.type === "heading") return false
        },
      },
      editableProps: {
        renderElement: ({ element, attributes, children }) => {
          if (element.type === "heading") {
            const Heading = `h${element.level}`
            return <Heading {...attributes}>{children}</Heading>
          }
        },
      },
    }
  })
