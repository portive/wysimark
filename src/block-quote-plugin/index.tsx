import React from "react"
import { Descendant, Element, Transforms } from "slate"

import { createHotkeyHandler, createPlugin } from "~/src/sink"

export type BlockQuoteEditor = {
  supportsBlockQuote: true
  blockQuotePlugin: {
    indent: () => void
    outdent: () => void
  }
}

export type BlockQuoteElement = {
  type: "block-quote"
  children: Descendant[]
}

export type BlockQuotePluginCustomTypes = {
  Name: "block-quote"
  Editor: BlockQuoteEditor
  Element: BlockQuoteElement
}

export const BlockQuotePlugin = () =>
  createPlugin<BlockQuotePluginCustomTypes>((editor) => {
    editor.supportsBlockQuote = true
    editor.blockQuotePlugin = {
      indent: () => {
        Transforms.wrapNodes(
          editor,
          { type: "block-quote", children: [] },
          {
            match: (node) =>
              Element.isElement(node) &&
              (node.type === "paragraph" ||
                node.type === "code-block" ||
                node.type === "table"),
          }
        )
      },
      outdent: () => {
        Transforms.liftNodes(editor, {
          match: (node) =>
            Element.isElement(node) &&
            (node.type === "paragraph" ||
              node.type === "code-block" ||
              node.type === "table"),
        })
      },
    }
    return {
      name: "block-quote",
      editor: {
        isInline(element) {
          if (element.type === "block-quote") return false
        },
        isVoid(element) {
          if (element.type === "block-quote") return false
        },
      },
      editableProps: {
        renderElement: ({ element, attributes, children }) => {
          if (element.type === "block-quote") {
            return (
              <blockquote
                {...attributes}
                style={{
                  marginLeft: 0,
                  borderLeft: "0.5em solid #e0e0e0",
                  paddingLeft: "1em",
                }}
              >
                {children}
              </blockquote>
            )
          }
        },
        onKeyDown: createHotkeyHandler({
          "super+.": editor.blockQuotePlugin.indent,
          "super+,": editor.blockQuotePlugin.outdent,
        }),
      },
    }
  })
