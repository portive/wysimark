import { Descendant } from "slate"

import { createHotkeyHandler, createPlugin, curry } from "~/src/sink"

import { normalizeNode } from "./normalize-node"
import { Paragraph } from "./render-element/paragraph"

export type CollapsibleParagraphEditor = {
  collapsibleParagraph: {
    toggleParagraph: () => void
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

export const CollapsibleParagraphPlugin = () =>
  createPlugin<CollapsibleParagraphPluginCustomTypes>((editor) => {
    editor.convertElement.addConvertElementType("paragraph")
    editor.collapsibleParagraph = {
      toggleParagraph: () => {
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
        normalizeNode: curry(normalizeNode, editor),
      },
      editableProps: {
        renderElement: (props) => {
          switch (props.element.type) {
            case "paragraph":
              return <Paragraph {...props} />
          }
        },
        onKeyDown: createHotkeyHandler({
          "super+0": editor.collapsibleParagraph.toggleParagraph,
        }),
      },
    }
  })
