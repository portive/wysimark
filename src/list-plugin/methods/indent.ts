import { Editor } from "slate"

import { setNodesDynamic } from "~/src/sink"

import { isListItem, ListItemElement } from ".."

export function indent(editor: Editor) {
  return setNodesDynamic<ListItemElement>(
    editor,
    (node) => ({ depth: node.depth + 1 }),
    {
      match: isListItem,
    }
  )
}
