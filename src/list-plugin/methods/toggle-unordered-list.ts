import { Editor } from "slate"

import { toggle } from "~/src/sink"

import { UnorderedListItemElement } from ".."

export function toggleUnorderedList(editor: Editor) {
  return toggle<UnorderedListItemElement>(
    editor,
    (element) => element.type === "unordered-list-item",
    (element) => {
      return {
        type: "unordered-list-item",
        depth: "depth" in element ? element.depth : 0,
      }
    }
  )
}
