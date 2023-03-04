import React from "react"

import { createHotkeyHandler, createPlugin } from "~/src/sink"

import { HorizontalRule } from "./horizontal-rule"
import { createHorizontalRuleMethods } from "./methods"
import { HorizontalRulePluginCustomTypes } from "./types"
export * from "./types"

export const HorizontalRulePlugin =
  createPlugin<HorizontalRulePluginCustomTypes>(
    (editor, options, { createPolicy }) => {
      editor.horizontalRule = createHorizontalRuleMethods(editor)
      return createPolicy({
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
          onKeyDown: createHotkeyHandler({
            "super+-": editor.horizontalRule.insertHorizontalRule,
          }),
        },
      })
    }
  )
