import React from "react"
import { BaseElement } from "slate"

import { createPlugin } from "~/src/sink"

export type InlineCodeEditor = {
  supportsInlineCode: true
}

export type InlineCodeText = {
  text: string
  code?: true
}

export type InlineCodePluginCustomTypes = {
  Name: "inline-code"
  Editor: InlineCodeEditor
  Text: InlineCodeText
}

export const InlineCodePlugin = () =>
  createPlugin<InlineCodePluginCustomTypes>((editor) => {
    editor.supportsInlineCode = true
    return {
      name: "inline-code",
      editableProps: {
        renderLeaf: ({ leaf, children }) => {
          if (leaf.code) {
            return (
              <code
                style={{
                  backgroundColor: "#e0e0e0",
                  borderRadius: "0.25em",
                  padding: "0.25em",
                }}
              >
                {children}
              </code>
            )
          } else {
            return children
          }
        },
      },
    }
  })
