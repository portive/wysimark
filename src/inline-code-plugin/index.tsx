import { styled } from "goober"
import React, { forwardRef } from "react"

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

const $InlineCode = styled("code", forwardRef)`
  background-color: var(--inline-code-bgcolor);
  border-radius: 0.25em;
  padding: 0.25em;
  font-size: 0.875em;
`

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
            return <$InlineCode>{children}</$InlineCode>
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
