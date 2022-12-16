import { Editor } from "slate"

import { setNodes } from "~/src/sink"

import { isListItem, ListItemElement } from ".."

export function indent(editor: Editor) {
  return setNodes<ListItemElement>(editor, {
    match: isListItem,
    convert: (node) => ({ depth: node.depth + 1 }),
  })
}
