import { Descendant } from "slate"

import { createPlugin, curryOne } from "~/src/sink"

import { createAnchorMethods } from "./methods"
import { normalizeNode } from "./normalize-node"
import { Anchor } from "./render-element/anchor"

type AnchorMethods = ReturnType<typeof createAnchorMethods>

export type AnchorEditor = {
  anchor: AnchorMethods
}

export type AnchorElement = {
  type: "anchor"
  href: string
  target?: string
  title?: string
  children: Descendant[]
}

export type AnchorPluginCustomTypes = {
  Name: "anchor"
  Editor: AnchorEditor
  Element: AnchorElement
}

export const AnchorPlugin = () =>
  createPlugin<AnchorPluginCustomTypes>((editor) => {
    editor.anchor = createAnchorMethods(editor)
    return {
      name: "anchor",
      editor: {
        isInline(element) {
          if (element.type === "anchor") return true
        },
        normalizeNode: curryOne(normalizeNode, editor),
      },
      editableProps: {
        onPaste: (e) => {
          const clipboardData = e.clipboardData
          const { types } = clipboardData
          /**
           * We don't want to handle it if it's not just plain text. If it is
           * plain text, it will have only one type and it will be "text/plain".
           * HTML, for example, also has "text/plain" but also "text/html"
           */
          if (types.length > 1) return false
          if (types[0] !== "text/plain") return false

          /**
           * Check to make sure the text is a URL
           */
          const text = clipboardData.getData("text/plain")
          if (!isUrl(text)) return false

          /**
           * If it is a URL, then insert the link
           */
          e.preventDefault()
          e.stopPropagation()
          editor.anchor.insertLink(text)
          return true
        },
        renderElement: ({ element, attributes, children }) => {
          if (element.type === "anchor") {
            return (
              <Anchor element={element} attributes={attributes}>
                {children}
              </Anchor>
            )
          }
        },
      },
    }
  })

function isUrl(s: string): boolean {
  let url
  try {
    url = new URL(s)
  } catch (_) {
    return false
  }
  return (
    url.protocol === "http:" ||
    url.protocol === "https:" ||
    url.protocol === "mailto:"
  )
}
