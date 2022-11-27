import React from "react"
import { BaseEditor, BaseText } from "slate"

import { createPlugin } from ".."
import { PluginCustomTypes } from "../types"

export type AnchorEditor = BaseEditor & { supportsAnchors: true }

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

export const anchorPlugin = createPlugin<
  "anchor",
  AnchorEditor,
  AnchorElement,
  BaseText
>((editor) => {
  editor.supportsAnchors = true
  return {
    name: "anchor",
    editorProps: {
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
