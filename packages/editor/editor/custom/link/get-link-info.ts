import { Editor, Element, Node, Path, Range } from "slate"
import { LinkElement } from "~/editor/types"

/**
 * Returns a collapsed Range at the start of the Editor as a default location
 * for insertion. Normally, this shouldn't happen unless the user clicks the
 * insert link button without selecting anything in the Editor.
 */
function getStartRange(editor: Editor): Range {
  return {
    anchor: Editor.start(editor, [0]),
    focus: Editor.start(editor, [0]),
  }
}

/**
 * Uses the editor's `lastSelection` to learn about what the current link
 * should be and if there is no current link, returns "" for text and url
 * and a collapsed range which would be the insertion point.
 */
export function getLinkInfo(editor: Editor): {
  text: string
  url: string
  range: Range
  path: Path | null
} {
  try {
    /**
     * If no selection, use start of document
     */
    if (editor.lastSelection == null)
      return { text: "", url: "", path: null, range: getStartRange(editor) }
    /**
     * Look for a link element starting from the collapsed selection
     */
    const linkEntry = Editor.above<LinkElement>(editor, {
      match: (node) => Element.isElement(node) && node.type === "link",
    })
    if (linkEntry == null) {
      /**
       * If we can't find a link entry from the collapsed selection, then we
       * look to the lastSelection to tell us the text for the link (if any)
       * and the Range for the link.
       */
      const fragment = Node.fragment(editor, editor.lastSelection)
      const text = fragment.map(Node.string).join("")
      return { text, url: "", path: null, range: editor.lastSelection }
    } else {
      /**
       * If we do find a link entry, then we use the link for the range and
       * to populate text and url
       */
      return {
        text: Node.string(linkEntry[0]),
        url: linkEntry[0].url,
        path: linkEntry[1],
        range: {
          anchor: Editor.start(editor, linkEntry[1]),
          focus: Editor.end(editor, linkEntry[1]),
        },
      }
    }
    // }
  } catch (e) {
    /**
     * If error, use start of document
     */
    console.warn("Warning in getLastSelectedText. Error thrown so returning ''")
    return { text: "", url: "", path: null, range: getStartRange(editor) }
  }
}
