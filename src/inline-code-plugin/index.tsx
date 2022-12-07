import React from "react"

import { createHotkeyHandler, createPlugin, toggleMark } from "~/src/sink"

export type InlineCodeEditor = {
  supportsInlineCode: true
  inlineCodePlugin: {
    toggleInlineCode: () => void
  }
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
    const p = (editor.inlineCodePlugin = {
      toggleInlineCode: () => toggleMark(editor, "code"),
    })
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
        onKeyDown: createHotkeyHandler({
          "mod+j": () => p.toggleInlineCode(),
        }),
      },
    }
  })
