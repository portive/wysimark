import { Descendant, Element, NodeEntry } from "slate"

import { createPlugin, normalizeSiblings } from "~/src/sink"

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
        normalizeNode: (entry) => {
          const [node, path] = entry
          if (!Element.isElement(node)) return false
          if (!editor.isVoid(node) && !editor.isMaster(node)) return false
          return normalizeSiblings<Element>(
            editor,
            /**
             * Not sure why this isn't cast as Element automatically from
             * !Element.isElement above but pretty sure this typecast is
             * okay.
             */
            [node, path],
            (a, b) => {
              if (!Element.isElement(a[0]) || !Element.isElement(b[0]))
                return false
              a
              return false
            }
          )
        },
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
