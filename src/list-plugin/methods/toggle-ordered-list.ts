import { Editor } from "slate"

import { toggle } from "~/src/sink"

import { OrderedListItemElement } from ".."

export function toggleOrderedList(editor: Editor) {
  return toggle<OrderedListItemElement>(
    editor,
    (element) => element.type === "ordered-list-item",
    (element) => {
      return {
        type: "ordered-list-item",
        depth: "depth" in element ? element.depth : 0,
      }
    }
  )
}
