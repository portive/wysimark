import React from "react"
import { BaseEditor, BaseElement, BaseText } from "slate"

import { createPlugin } from ".."
import { PluginCustomTypes } from "../types"

export type BoldEditor = BaseEditor & { supportsBold: true }

export type BoldPluginCustomTypes = PluginCustomTypes<{
  Name: "bold"
  Editor: BoldEditor
  Element: BaseElement
  Text: BaseText & { bold?: true }
}>

export const boldPlugin = createPlugin<BoldPluginCustomTypes>((editor) => {
  editor.supportsBold = true
  return {
    name: "bold",
    editableProps: {
      renderLeaf({ leaf, children }) {
        if (leaf.bold) {
          return <span style={{ fontWeight: "bold" }}>{children}</span>
        }
      },
    },
  }
})
