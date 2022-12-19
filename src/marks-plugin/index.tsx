import clsx from "clsx"
import React from "react"

import { createHotkeyHandler, createPlugin, toggleMark } from "~/src/sink"

import { $Span } from "./styles"

export type MarksEditor = {
  marksPlugin: {
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
    const p = (editor.marksPlugin = {
      toggleBold: () => toggleMark(editor, "bold"),
      toggleItalic: () => toggleMark(editor, "italic"),
      toggleUnderline: () => toggleMark(editor, "underline"),
      toggleSup: () => toggleMark(editor, "sup", "sub"),
      toggleSub: () => toggleMark(editor, "sub", "sup"),
      toggleStrike: () => toggleMark(editor, "strike"),
    })
    return {
      name: "marks",
      editableProps: {
        renderLeaf: ({ leaf, children }) => {
          return (
            <$Span
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
            </$Span>
          )
        },
        onKeyDown: createHotkeyHandler({
          "mod+b": p.toggleBold,
          "mod+i": p.toggleItalic,
          "mod+u": p.toggleUnderline,
          "super+p": p.toggleSup,
          "super+b": p.toggleSub,
          "super+k": p.toggleStrike,
        }),
      },
    }
  })
