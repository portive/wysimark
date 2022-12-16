import React from "react"

import { createPlugin } from "~/src/sink"

import { HorizontalRule } from "./horizontal-rule"
import { HorizontalRulePluginCustomTypes } from "./types"
export * from "./types"

export const HorizontalRulePlugin = () =>
  createPlugin<HorizontalRulePluginCustomTypes>((editor) => {
    editor.supportsHorizontalRule = true
    return {
      name: "horizontal-rule",
      editor: {
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
