import React from "react"
import { BaseElement, BaseText, Text } from "slate"

import { createPlugin } from "~/src/sink"

export type MarksEditor = {
  supportsMarks: true
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
  Element: BaseElement
  Text: MarksText
}

export const MarksPlugin = () =>
  createPlugin<MarksPluginCustomTypes>((editor) => {
    editor.supportsMarks = true
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
      },
    }
  })
