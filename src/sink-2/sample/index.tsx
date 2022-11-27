import React from "react"
import { BaseEditor, BaseText } from "slate"

import { createPlugin, SinkPlugin } from ".."
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
    editor,
    editableProps: {
      renderElement: ({ element, attributes, children }) => {
        if (element.type === "anchor") {
          return (
            <a {...attributes} href={element.href}>
              {children}
            </a>
          )
        }
      },
    },
  }
})
