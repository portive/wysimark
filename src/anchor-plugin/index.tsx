import { styled } from "goober"
import React, { forwardRef } from "react"
import { Descendant, Editor, Transforms } from "slate"

import { createPlugin } from "~/src/sink"

import { createAnchorMethods } from "./methods"

type AnchorMethods = ReturnType<typeof createAnchorMethods>

export type AnchorEditor = {
  anchor: AnchorMethods
}

export type AnchorElement = {
  type: "anchor"
  href: string
  target?: string
  children: Descendant[]
}

export type AnchorPluginCustomTypes = {
  Name: "anchor"
  Editor: AnchorEditor
  Element: AnchorElement
}

const $Anchor = styled("a", forwardRef)`
  color: var(--link-color, blue);
  &:hover {
    color: var(--link-hover-color, blue);
  }
`

export const AnchorPlugin = () =>
  createPlugin<AnchorPluginCustomTypes>((editor) => {
    editor.anchor = createAnchorMethods(editor)
    return {
      name: "anchor",
      editor: {
        isInline(element) {
          if (element.type === "anchor") return true
        },
        isVoid(element) {
          if (element.type === "anchor") return false
        },
      },
      editableProps: {
        renderElement: ({ element, attributes, children }) => {
          if (element.type === "anchor") {
            return (
              <$Anchor
                {...attributes}
                href={element.href}
                target={element.target}
              >
                {children}
              </$Anchor>
            )
          }
        },
      },
    }
  })
