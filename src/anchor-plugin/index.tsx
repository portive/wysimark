import { Descendant } from "slate"

import { createPlugin } from "~/src/sink"

import { createAnchorMethods } from "./methods"
import { Anchor } from "./render-element/anchor"

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

export const AnchorPlugin = () =>
  createPlugin<AnchorPluginCustomTypes>((editor) => {
    editor.anchor = createAnchorMethods(editor)
    return {
      name: "anchor",
      editor: {
        isInline(element) {
          if (element.type === "anchor") return true
        },
      },
      editableProps: {
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
