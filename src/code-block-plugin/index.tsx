import React from "react"
import { useSelected } from "slate-react"

import { createPlugin } from "~/src/sink"

import { decorate } from "./decorate"
import { $CodeBlock, $CodeLine } from "./styles"
import { tokenStyles } from "./theme"
import { CodeBlockPluginCustomTypes } from "./types"
export * from "./decorate"
export * from "./types"

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
          const selected = useSelected()
          if (element.type === "code-block") {
            return (
              <$CodeBlock
                className={selected ? "--selected" : ""}
                {...attributes}
              >
                <code style={{ fontFamily: "andale mono" }}>{children}</code>
              </$CodeBlock>
            )
          } else if (element.type === "code-block-line") {
            return (
              <$CodeLine
                className={selected ? "--selected" : ""}
                {...attributes}
              >
                {children}
              </$CodeLine>
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
