import { isHotkey } from "is-hotkey"
import React from "react"
import { BaseElement } from "slate"

import { createPlugin, toggleMark } from "~/src/sink"

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
    const isBold = isHotkey("mod+b")
    const isItalic = isHotkey("mod+i")
    const isUnderline = isHotkey("mod+u")
    const isSup = isHotkey("mod+shift+p")
    const isSub = isHotkey("mod+shift+b")
    editor.marksPlugin = {
      toggleBold: () => toggleMark(editor, "bold"),
      toggleItalic: () => toggleMark(editor, "italic"),
      toggleUnderline: () => toggleMark(editor, "underline"),
      toggleSup: () => toggleMark(editor, "sup", "sub"),
      toggleSub: () => toggleMark(editor, "sub", "sup"),
    }
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
        onKeyDown: ({ nativeEvent: e }) => {
          if (isBold(e)) {
            e.preventDefault()
            console.log(editor)
            editor.marksPlugin.toggleBold()
            return true
          }
          if (isItalic(e)) {
            e.preventDefault()
            editor.marksPlugin.toggleItalic()
            return true
          }
          if (isUnderline(e)) {
            e.preventDefault()
            editor.marksPlugin.toggleUnderline()
            toggleMark(editor, "underline")
            return true
          }
          if (isSup(e)) {
            e.preventDefault()
            editor.marksPlugin.toggleSup()
            return true
          }
          if (isSub(e)) {
            e.preventDefault()
            editor.marksPlugin.toggleSub()
            return true
          }
          return false
        },
      },
    }
  })
