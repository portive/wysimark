import React from "react"

import { createPlugin } from "~/src/sink"

import { HorizontalRule } from "./horizontal-rule"

export type HorizontalRuleEditor = {
  supportsHorizontalRule: true
}

export type HorizontalRuleElement = {
  type: "horizontal-rule"
  children: [{ text: "" }]
}

export type HorizontalRulePluginCustomTypes = {
  Name: "horizontal-rule"
  Editor: HorizontalRuleEditor
  Element: HorizontalRuleElement
}

export const HorizontalRulePlugin = () =>
  createPlugin<HorizontalRulePluginCustomTypes>((editor) => {
    editor.supportsHorizontalRule = true
    return {
      name: "horizontal-rule",
      editor: {
        isInline(element) {
          if (element.type === "horizontal-rule") return false
        },
        isVoid(element) {
          if (element.type === "horizontal-rule") return true
        },
      },
      editableProps: {
        renderElement: (props) => {
          if (props.element.type === "horizontal-rule") {
            return <HorizontalRule {...props} />
          }
        },
      },
    }
  })
