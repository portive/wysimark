import { Descendant } from "slate"

import { createHotkeyHandler, createPlugin, curryOne } from "~/src/sink"

import { normalizeNode } from "./normalize-node"
import { Paragraph } from "./render-element/paragraph"

export type CollapsibleParagraphEditor = {
  collapsibleParagraph: {
    convertParagraph: () => void
  }
}

export type ParagraphElement = {
  type: "paragraph"
  __collapsible?: true
  children: Descendant[]
}

export type CollapsibleParagraphPluginCustomTypes = {
  Name: "collapsible-paragraph"
  Editor: CollapsibleParagraphEditor
  Element: ParagraphElement
}

export const CollapsibleParagraphPlugin =
  createPlugin<CollapsibleParagraphPluginCustomTypes>((editor) => {
    editor.convertElement.addConvertElementType("paragraph")
    editor.collapsibleParagraph = {
      convertParagraph: () => {
        editor.convertElement.convertElements<ParagraphElement>(
          () => false,
          {
            type: "paragraph",
          },
          false
        )
      },
    }
    if (!editor.normalizeAfterDelete) {
      throw new Error(
        `The collapsible-paragraph-plugin has a dependency on the normalize-after-delete plugin. Please add that plugin before this one.`
      )
    }
    return {
      name: "collapsible-paragraph",
      editor: {
        normalizeNode: curryOne(normalizeNode, editor),
      },
      editableProps: {
        renderElement: ({ element, attributes, children }) => {
          switch (element.type) {
            case "paragraph": {
              return (
                <Paragraph element={element} attributes={attributes}>
                  {children}
                </Paragraph>
              )
            }
          }
        },
        onKeyDown: createHotkeyHandler({
          "super+0": editor.collapsibleParagraph.convertParagraph,
        }),
      },
    }
  })
