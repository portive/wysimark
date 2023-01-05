import { Editor } from "slate"

import { OrderedListItemElement } from ".."

export function toggleOrderedList(editor: Editor) {
  return editor.toggleElement.toggleElements<OrderedListItemElement>(
    (element) => element.type === "ordered-list-item",
    (element) => {
      return {
        type: "ordered-list-item",
        depth: "depth" in element ? element.depth : 0,
      }
    }
  )
}
