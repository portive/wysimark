import { styled } from "goober"
import React, { forwardRef } from "react"
import { BaseText, Text } from "slate"

import { createPlugin } from "~/src/sink"

import { decorate } from "./decorate"
import { tokenStyles } from "./theme"
export * from "./decorate"

export type CodeBlockEditor = {
  supportsCodeBlock: true
}

export type CodeBlockLineElement = {
  type: "code-block-line"
  children: Text[]
}

export type CodeBlockElement = {
  type: "code-block"
  language: string
  children: CodeBlockLineElement[]
}

export type CodeBlockPluginCustomTypes = {
  Name: "code-block"
  Editor: CodeBlockEditor
  Element: CodeBlockElement | CodeBlockLineElement
  Text: BaseText & { prismToken?: string }
}

const $CodeBlock = styled("pre", forwardRef)`
  background: #f8f8f8;
  margin: 1em 0;
  padding: 1em;
  border-radius: 0.5em;
  border: 1px solid rgba(0, 0, 0, 0.1);
  code {
    font-family: "andale mono", AndaleMono, monospace;
    font-size: 0.825em;
  }
  counter-reset: line;
`

const $CodeLine = styled("div", forwardRef)`
  line-height: 1.5em;
  counter-increment: line;
  &:before {
    content: counter(line);
    color: rgba(0, 0, 0, 0.25);
    border-right: 1px solid rgba(0, 0, 0, 0.05);
    margin-right: 1em;
    padding: 0em 1em 0 0;
    text-align: right;
    display: inline-block;
    width: 1.25em;
  }
`

export const CodeBlockPlugin = () =>
  createPlugin<CodeBlockPluginCustomTypes>((editor) => {
    editor.supportsCodeBlock = true
    return {
      name: "code-block",
      editor: {
        isInline(element) {
          if (
            element.type === "code-block" ||
            element.type === "code-block-line"
          )
            return false
        },
        isVoid(element) {
          if (
            element.type === "code-block" ||
            element.type == "code-block-line"
          )
            return false
        },
      },
      editableProps: {
        decorate,
        renderElement: ({ element, attributes, children }) => {
          if (element.type === "code-block") {
            return (
              <$CodeBlock {...attributes}>
                <code style={{ fontFamily: "andale mono" }}>{children}</code>
              </$CodeBlock>
            )
          } else if (element.type === "code-block-line") {
            return <$CodeLine {...attributes}>{children}</$CodeLine>
          }
        },
        renderLeaf: ({ leaf, children }) => {
          const style = leaf.prismToken
            ? tokenStyles[leaf.prismToken] || null
            : null
          if (style === null) {
            return children
          } else {
            return <span style={style}>{children}</span>
          }
        },
      },
    }
  })
