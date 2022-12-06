import { isHotkey } from "is-hotkey"
import React from "react"
import { BaseText, Descendant } from "slate"

import { createPlugin, replaceElements } from "~/src/sink"

export type HeadingEditor = {
  supportsHeadings: true
  headingPlugin: {
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

export const HeadingPlugin = () =>
  createPlugin<HeadingPluginCustomTypes>((editor) => {
    editor.supportsHeadings = true
    editor.headingPlugin = {
      toggleHeading: (level) => {
        replaceElements(editor, (element) => {
          if (element.type === "heading" && element.level === level) {
            return { type: "paragraph", children: element.children }
          } else if (
            element.type === "paragraph" ||
            element.type === "heading"
          ) {
            return { type: "heading", level, children: element.children }
          } else {
            return null
          }
        })
      },
    }
    const { headingPlugin } = editor
    const isHeading1 = isHotkey("ctrl+shift+1")
    const isHeading2 = isHotkey("ctrl+shift+2")
    const isHeading3 = isHotkey("ctrl+shift+3")
    const isHeading4 = isHotkey("ctrl+shift+4")
    const isHeading5 = isHotkey("ctrl+shift+5")
    const isHeading6 = isHotkey("ctrl+shift+6")
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
        onKeyDown: ({ nativeEvent: e }) => {
          if (isHeading1(e)) {
            stop(e)
            headingPlugin.toggleHeading(1)
            return true
          }
          if (isHeading2(e)) {
            stop(e)
            editor.headingPlugin.toggleHeading(2)
            return true
          }
          if (isHeading3(e)) {
            stop(e)
            editor.headingPlugin.toggleHeading(3)
            return true
          }
          if (isHeading4(e)) {
            stop(e)
            editor.headingPlugin.toggleHeading(4)
            return true
          }
          if (isHeading5(e)) {
            stop(e)
            editor.headingPlugin.toggleHeading(5)
            return true
          }
          if (isHeading6(e)) {
            stop(e)
            editor.headingPlugin.toggleHeading(6)
            return true
          }
          return false
        },
      },
    }
  })

function stop(e: KeyboardEvent) {
  e.preventDefault()
  e.stopPropagation()
}
