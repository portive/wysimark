import React from "react"
import { Descendant } from "slate"
import { useSelected } from "slate-react"

import { ConstrainedRenderElementProps, createPlugin } from "~/src/sink"

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

function HorizontalRule({
  attributes,
  children,
}: ConstrainedRenderElementProps<HorizontalRuleElement>) {
  const selected = useSelected()
  return (
    <div
      {...attributes}
      style={{ outline: selected ? "2px solid royalblue" : "none" }}
    >
      {children}
      <div contentEditable={false}>
        <hr />
      </div>
    </div>
  )
}
