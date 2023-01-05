import React from "react"

import { createHotkeyHandler, createPlugin } from "~/src/sink"

import { $InlineCode } from "./styles"
import { InlineCodePluginCustomTypes } from "./types"
export * from "./styles"
export * from "./types"

export const InlineCodePlugin = () =>
  createPlugin<InlineCodePluginCustomTypes>((editor) => {
    if (!editor.marksPlugin)
      throw new Error(
        "InlineCodePlugin has a dependency on the MarksPlugin but the MarksPlugin has not been added or is added after the InlineCodePlugin"
      )
    editor.supportsInlineCode = true
    editor.inlineCodePlugin = {
      toggleInlineCode: () => editor.marksPlugin.toggleMark("code"),
    }
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
          "mod+j": () => editor.inlineCodePlugin.toggleInlineCode(),
        }),
      },
    }
  })
