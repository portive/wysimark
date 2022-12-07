import React from "react"
import { Descendant } from "slate"

import { createPlugin } from "~/src/sink"

export type AnchorEditor = {
  supportsAnchor: true
}

export type AnchorElement = {
  type: "anchor"
  href: string
  target?: string
  children: Descendant[]
}

export type AnchorPluginCustomTypes = {
  Name: "anchor"
  Editor: AnchorEditor
  Element: AnchorElement
}

export const AnchorPlugin = () =>
  createPlugin<AnchorPluginCustomTypes>((editor) => {
    editor.supportsAnchor = true
    return {
      name: "anchor",
      editor: {
        isInline(element) {
          if (element.type === "anchor") return true
        },
        isVoid(element) {
          if (element.type === "anchor") return false
        },
      },
      editableProps: {
        renderElement: ({ element, attributes, children }) => {
          if (element.type === "anchor") {
            return (
              <a {...attributes} href={element.href} target={element.target}>
                {children}
              </a>
            )
          }
        },
      },
    }
  })
