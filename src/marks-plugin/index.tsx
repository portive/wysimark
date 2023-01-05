import { clsx } from "clsx"
import React from "react"

import { createHotkeyHandler, createPlugin } from "~/src/sink"

import { createMarksMethods } from "./methods"
import { $MarksSpan } from "./styles"

export type MarksEditor = {
  /**
   * IMPORTANT:
   *
   * This cannot be named `marks` because it conflicts with the `editor.marks`
   * built into the BaseEditor.j
   */
  marksPlugin: ReturnType<typeof createMarksMethods>
}

export type MarksText = {
  text: string
  bold?: true
  italic?: true
  underline?: true
  sup?: true
  sub?: true
  strike?: true
}

export type MarksPluginCustomTypes = {
  Name: "marks"
  Editor: MarksEditor
  Text: MarksText
}

export const MarksPlugin = () =>
  createPlugin<MarksPluginCustomTypes>((editor) => {
    editor.marksPlugin = createMarksMethods(editor)
    return {
      name: "marks",
      editableProps: {
        renderLeaf: ({ leaf, children }) => {
          return (
            <$MarksSpan
              className={clsx({
                "--bold": leaf.bold,
                "--italic": leaf.italic,
                "--underline": leaf.underline,
                "--sup": leaf.sup,
                "--sub": leaf.sub,
                "--strike": leaf.strike,
              })}
            >
              {children}
            </$MarksSpan>
          )
        },
        onKeyDown: createHotkeyHandler({
          "mod+b": editor.marksPlugin.toggleBold,
          "mod+i": editor.marksPlugin.toggleItalic,
          "mod+u": editor.marksPlugin.toggleUnderline,
          "super+p": editor.marksPlugin.toggleSup,
          "super+b": editor.marksPlugin.toggleSub,
          "super+k": editor.marksPlugin.toggleStrike,
        }),
      },
    }
  })
