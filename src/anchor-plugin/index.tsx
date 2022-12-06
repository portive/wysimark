import React from "react"
import { Text } from "slate"

import { createPlugin } from "~/src/sink"

export type AnchorEditor = {
  supportsAnchors: true
}

export type AnchorElement = {
  type: "anchor"
  href: string
  target?: string
  children: Text[]
}

export type AnchorPluginCustomTypes = {
  Name: "anchor"
  Editor: AnchorEditor
  Element: AnchorElement
}

export const AnchorPlugin = () =>
  createPlugin<AnchorPluginCustomTypes>((editor) => {
    editor.supportsAnchors = true
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
