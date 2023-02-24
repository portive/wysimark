import React from "react"
import { useSelected } from "slate-react"

import { createHotkeyHandler, createPlugin } from "~/src/sink"

import { decorate } from "./decorate"
import { createCodeBlockMethods } from "./methods"
import { tokenStyles } from "./prism-theme"
import { $CodeBlock, $CodeLine } from "./styles"
import { CodeBlockPluginCustomTypes } from "./types"
export * from "./decorate"
export * from "./types"
import { Editor, Element, Node, Transforms } from "slate"

export const CodeBlockPlugin = () =>
  createPlugin<CodeBlockPluginCustomTypes>((editor) => {
    editor.codeBlock = createCodeBlockMethods(editor)
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
        isMaster(element) {
          if (element.type === "code-block") return true
        },
        normalizeNode(entry) {
          /**
           * Code lines should only contain plain text.
           *
           * - If they contain void elements like images, remove them
           * - If they contain non-void elements, unwrap them
           *
           * TODO:
           *
           * Convert pasted in elements to Markdown code
           */
          if (
            Element.isElement(entry[0]) &&
            entry[0].type === "code-block-line"
          ) {
            for (const [child, path] of Node.children(editor, entry[1])) {
              if (!Element.isElement(child)) continue
              if (editor.isVoid(child)) {
                Transforms.removeNodes(editor, { at: path })
                return true
              } else {
                Transforms.unwrapNodes(editor, { at: path })
                return true
              }
            }
          }
          /**
           * Code blocks should only contain code lines.
           *
           * - If they contain void blocks like images, remove them
           * - If they contain non-void blocks, then convert them to code lines
           *
           * TODO:
           *
           * Convert pasted in elements to Markdown code
           */
          if (Element.isElement(entry[0]) && entry[0].type === "code-block") {
            for (const [child, path] of Node.children(editor, entry[1])) {
              if (
                Element.isElement(child) &&
                child.type !== "code-block-line"
              ) {
                if (editor.isVoid(child)) {
                  Transforms.removeNodes(editor, { at: path })
                  return true
                } else {
                  Transforms.removeNodes(editor, { at: path })
                  Transforms.insertNodes(editor, {
                    type: "code-block-line",
                    children: [{ text: Node.string(child) }],
                  })
                  return true
                }
              }
            }
          }
          return false
        },
      },
      editableProps: {
        decorate,
        onKeyDown: createHotkeyHandler({
          "super+`": editor.codeBlock.createCodeBlock,
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
    }
  })
