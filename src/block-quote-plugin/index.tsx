import React from "react"
import { Descendant, Element, Node, Transforms } from "slate"

import {
  createHotkeyHandler,
  createPlugin,
  normalizeSiblings,
} from "~/src/sink"

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

function matchBlockQuoteSafe(node: Node) {
  return (
    Element.isElement(node) &&
    /**
     * TODO:
     *
     * This is probably:
     * Element.isElement(node) && !Element.isInline(node) &&
     * !Element.isDependant(node)
     */
    (node.type === "paragraph" ||
      node.type === "code-block" ||
      node.type === "table" ||
      node.type === "horizontal-rule" ||
      node.type === "heading")
  )
}

export const BlockQuotePlugin = () =>
  createPlugin<BlockQuotePluginCustomTypes>((editor) => {
    editor.supportsBlockQuote = true
    editor.blockQuotePlugin = {
      indent: () => {
        Transforms.wrapNodes(
          editor,
          { type: "block-quote", children: [] },
          { match: matchBlockQuoteSafe }
        )
      },
      outdent: () => {
        Transforms.liftNodes(editor, {
          match: (node, path) => matchBlockQuoteSafe(node) && path.length > 1,
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
        normalizeNode(entry) {
          if (!Element.isElement(entry[0])) return false
          if (entry[0].type !== "block-quote") return false
          return normalizeSiblings(
            editor,
            entry,
            (a, b) => a.type === "block-quote" && b.type === "block-quote"
          )
        },
      },
      editableProps: {
        renderElement: ({ element, attributes, children }) => {
          if (element.type === "block-quote") {
            return (
              <blockquote
                {...attributes}
                style={{
                  marginTop: "1em",
                  marginBottom: "1em",
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
