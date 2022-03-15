import { Editor, Element, Transforms } from "slate"
import { isPrimaryBlockElement } from "../../types"

/**
 * Indent elements at the level of PrimaryBlockElement
 */

export function blockquote(editor: Editor) {
  Transforms.wrapNodes(
    editor,
    { type: "blockquote", children: [] },
    {
      match: isPrimaryBlockElement,
    }
  )
}

/**
 * Unindent block quote from the selection
 */

export function unblockquote(editor: Editor) {
  Transforms.unwrapNodes(editor, {
    match: (node) => Element.isElement(node) && node.type === "blockquote",
  })
}
