import { clsx } from "clsx"
import React from "react"

import { createHotkeyHandler, createPlugin, toggleMark } from "~/src/sink"

import { $MarksSpan } from "./styles"

export type MarksEditor = {
  marks: {
    toggleBold: () => void
    toggleItalic: () => void
    toggleUnderline: () => void
    toggleSup: () => void
    toggleSub: () => void
    toggleStrike: () => void
  }
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
    editor.marks = {
      toggleBold: () => toggleMark(editor, "bold"),
      toggleItalic: () => toggleMark(editor, "italic"),
      toggleUnderline: () => toggleMark(editor, "underline"),
      toggleSup: () => toggleMark(editor, "sup", "sub"),
      toggleSub: () => toggleMark(editor, "sub", "sup"),
      toggleStrike: () => toggleMark(editor, "strike"),
    }
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
          "mod+b": editor.marks.toggleBold,
          "mod+i": editor.marks.toggleItalic,
          "mod+u": editor.marks.toggleUnderline,
          "super+p": editor.marks.toggleSup,
          "super+b": editor.marks.toggleSub,
          "super+k": editor.marks.toggleStrike,
        }),
      },
    }
  })
