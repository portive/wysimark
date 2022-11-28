import React from "react"
import { BaseEditor, BaseElement, BaseText, Text } from "slate"

import { createPlugin } from ".."
import { PluginCustomTypes } from "../types"
import { AnchorElement } from "./anchor-plugin"

export type BoldEditor = { supportsBold: true }
export type BoldText = BaseText & { bold?: true }

export type BoldPluginCustomTypes = PluginCustomTypes<{
  Name: "bold"
  Editor: BoldEditor
  Element: { children: BoldText[] }
  Text: BoldText
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
