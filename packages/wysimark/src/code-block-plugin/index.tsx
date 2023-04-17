import React from "react"
import { useSelected } from "slate-react"

import {
  createHotkeyHandler,
  createPlugin,
  curryOne,
  findElementUp,
  TypedPlugin,
} from "~/src/sink"

import { decorate } from "./decorate"
import { createCodeBlockMethods } from "./methods"
import { tokenStyles } from "./prism-theme"
import { $CodeBlock, $CodeLine } from "./styles"
import { CodeBlockPluginCustomTypes } from "./types"
export * from "./decorate"
export * from "./types"
import { Editor, Element, Transforms } from "slate"

import { normalizeNode } from "./normalizeNode"

export const CodeBlockPlugin = createPlugin<CodeBlockPluginCustomTypes>(
  (editor, options, { createPolicy }) => {
    editor.codeBlock = createCodeBlockMethods(editor)
    return createPolicy({
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
        isMaster(element) {
          if (element.type === "code-block") return true
        },
        normalizeNode: curryOne(normalizeNode, editor),
      },
      editableProps: {
        decorate,
        onKeyDown: createHotkeyHandler({
          "super+`": () =>
            editor.codeBlock.createCodeBlock({ language: "text" }),
          "mod+a": () => {
            /**
             * When selection is in code-block and the user pressed mod+a,
             * select the code-block instead of the full document.
             */
            const entry = findElementUp(
              editor,
              (el) => Element.isElement(el) && el.type === "code-block"
            )
            if (!entry) return false
            Transforms.select(editor, entry[1])
            return true
          },
        }),
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
    })
  }
) as TypedPlugin<CodeBlockPluginCustomTypes>
