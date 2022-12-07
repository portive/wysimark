import React from "react"

import { createHotkeyHandler, createPlugin, toggleMark } from "~/src/sink"

export type MarksEditor = {
  supportsMarks: true
  marksPlugin: {
    toggleBold: () => void
    toggleItalic: () => void
    toggleUnderline: () => void
    toggleSup: () => void
    toggleSub: () => void
  }
}

export type MarksText = {
  text: string
  bold?: true
  italic?: true
  underline?: true
  sup?: true
  sub?: true
}

export type MarksPluginCustomTypes = {
  Name: "marks"
  Editor: MarksEditor
  Text: MarksText
}

export const MarksPlugin = () =>
  createPlugin<MarksPluginCustomTypes>((editor) => {
    editor.supportsMarks = true
    const p = (editor.marksPlugin = {
      toggleBold: () => toggleMark(editor, "bold"),
      toggleItalic: () => toggleMark(editor, "italic"),
      toggleUnderline: () => toggleMark(editor, "underline"),
      toggleSup: () => toggleMark(editor, "sup", "sub"),
      toggleSub: () => toggleMark(editor, "sub", "sup"),
    })
    return {
      name: "marks",
      editableProps: {
        renderLeaf: ({ leaf, children }) => {
          return (
            <span
              style={{
                fontWeight: leaf.bold ? "bold" : undefined,
                fontStyle: leaf.italic ? "italic" : undefined,
                textDecoration: leaf.underline ? "underline" : undefined,
                verticalAlign: leaf.sup
                  ? "super"
                  : leaf.sub
                  ? "sub"
                  : undefined,
              }}
            >
              {children}
            </span>
          )
        },
        onKeyDown: createHotkeyHandler({
          "mod+b": () => p.toggleBold(),
          "mod+i": () => p.toggleItalic(),
          "mod+u": () => p.toggleUnderline(),
          "super+p": () => p.toggleSup(),
          "super+b": () => p.toggleSub(),
        }),
      },
    }
  })
