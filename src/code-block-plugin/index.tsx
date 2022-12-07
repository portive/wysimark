import React from "react"
import { BaseText, Text } from "slate"

import { createPlugin } from "~/src/sink"

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
  Text: BaseText & { prismToken: string }
}

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
        renderElement: ({ element, attributes, children }) => {
          if (element.type === "code-block") {
            return (
              <pre
                {...attributes}
                style={{
                  background: "#f0f0f0",
                  padding: "1em",
                  borderRadius: "0.5em",
                  fontSize: "0.825em",
                }}
              >
                <code>{children}</code>
              </pre>
            )
          } else if (element.type === "code-block-line") {
            return (
              <div {...attributes} style={{ lineHeight: "1.5em" }}>
                {children}
              </div>
            )
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
