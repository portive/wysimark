import React from "react"
import { BaseEditor, BaseElement, BaseText } from "slate"

import { createPlugin } from ".."
import { PluginCustomTypes } from "../types"

export type BoldEditor = BaseEditor & { supportsBold: true }

export type AnchorPluginCustomTypes = PluginCustomTypes<{
  Name: "anchor"
  Editor: BoldEditor
  Element: BaseElement
  Text: BaseText & { bold?: true }
}>

export const boldPlugin = createPlugin<AnchorPluginCustomTypes>((editor) => {
  editor.supportsBold = true
  return {
    name: "anchor",
    editableProps: {
      renderLeaf({ leaf, children }) {
        if (leaf.bold) {
          return <span style={{ fontWeight: "bold" }}>{children}</span>
        }
      },
    },
  }
})
