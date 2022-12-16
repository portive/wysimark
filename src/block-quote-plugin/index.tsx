import { styled } from "goober"
import React, { forwardRef } from "react"
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

const $BlockQuote = styled("blockquote", forwardRef)`
  position: relative;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0;
  border-left: 0.25em solid rgba(0, 0, 0, 0.075);
  padding-left: 1.5em;
`

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
          const [node, path] = entry
          if (!Element.isElement(node)) return false
          if (node.type !== "block-quote") return false
          return normalizeSiblings<Element>(editor, [node, path], (a, b) => {
            if (
              Element.isElement(a[0]) &&
              Element.isElement(b[0]) &&
              a[0].type === "block-quote" &&
              b[0].type === "block-quote"
            ) {
              Transforms.mergeNodes(editor, { at: b[1] })
            }
            return false
          })
        },
      },
      editableProps: {
        renderElement: ({ element, attributes, children }) => {
          if (element.type === "block-quote") {
            return <$BlockQuote {...attributes}>{children}</$BlockQuote>
          }
        },
        onKeyDown: createHotkeyHandler({
          "super+.": editor.blockQuotePlugin.indent,
          "super+,": editor.blockQuotePlugin.outdent,
        }),
      },
    }
  })
