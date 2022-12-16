import { Descendant } from "slate"

import { createPlugin, curry } from "~/src/sink"

import { normalizeNode } from "./normalize-node"
import { Paragraph } from "./render-element/paragraph"

export type CollapsibleParagraphEditor = {
  collapsibleParagraph: true
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
      },
    }
  })
