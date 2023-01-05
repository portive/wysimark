import { Editor } from "slate"

import { UnorderedListItemElement } from ".."

export function toggleUnorderedList(editor: Editor) {
  return editor.toggle.toggleElements<UnorderedListItemElement>(
    (element) => element.type === "unordered-list-item",
    (element) => {
      return {
        type: "unordered-list-item",
        depth: "depth" in element ? element.depth : 0,
      }
    }
  )
}
