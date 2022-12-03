import React from "react"
import { BaseText, Text } from "slate"

import { createPlugin } from ".."
import { PluginCustomTypes } from "../types"

export type AnchorEditor = {
  supportsAnchors: true
}

export type AnchorElement = {
  type: "anchor"
  href: string
  target?: string
  children: BaseText[]
}

export type AnchorPluginCustomTypes = PluginCustomTypes<{
  Name: "anchor"
  Editor: AnchorEditor
  Element: AnchorElement
  Text: BaseText
}>

export const anchorPlugin = () =>
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
