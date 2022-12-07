import React from "react"
import { BaseText, Descendant } from "slate"

import { createPlugin } from "~/src/sink"

export type CodeBlockEditor = {
  supportsCodeBlock: true
}

export type CodeBlockLineElement = {
  type: "code-block-line"
  children: BaseText[]
}

export type CodeBlockElement = {
  type: "code-block"
  language: string
  // TODO: This would be better if it could be `CodeBlockLineElement``
  children: Descendant[]
}

export type CodeBlockPluginCustomTypes = {
  Name: "code-block"
  Editor: CodeBlockEditor
  Element: CodeBlockElement | CodeBlockLineElement
}

export const CodeBlockPlugin = () =>
  createPlugin<CodeBlockPluginCustomTypes>((editor) => {
    editor.supportsCodeBlock = true
    return {
      name: "code-block",
      editor: {
        isInline(element) {
          if (
            element.type === "code-block" ||
            element.type === "code-block-line"
          )
            return false
        },
        isVoid(element) {
          if (
            element.type === "code-block" ||
            element.type == "code-block-line"
          )
            return false
        },
      },
      editableProps: {
        renderElement: ({ element, attributes, children }) => {
          if (element.type === "code-block") {
            return (
              <pre
                {...attributes}
                style={{
                  background: "#f0f0f0",
                  padding: "1em",
                  borderRadius: "0.5em",
                  fontSize: "0.825em",
                }}
              >
                <code>{children}</code>
              </pre>
            )
          } else if (element.type === "code-block-line") {
            return <div {...attributes}>{children}</div>
          }
        },
      },
    }
  })
