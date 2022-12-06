import React from "react"
import { BaseText } from "slate"

import { createPlugin } from ".."
import { PluginCustomTypes } from "../types"

export type BoldEditor = { supportsBold: true }
export type BoldText = BaseText & { bold?: true }

export type BoldPluginCustomTypes = PluginCustomTypes<{
  Name: "bold"
  Editor: BoldEditor
  Element: { children: (BaseText & BoldText)[] }
  Text: BaseText & BoldText
}>

export const boldPlugin = () =>
  createPlugin<BoldPluginCustomTypes>((editor) => {
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
